/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import {Icon, Rating} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import defaultAvatar from '../../assets/img/default-avatar.svg';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import {Pie, Line} from 'react-chartjs-2';
import {getBills} from '../../Redux/reducer/PaymentHistoryReducer';
import {getCategory} from '../../Redux/reducer/CategoryReducer';
import {getBooking} from '../../Redux/reducer/BookingReducer';
import {getAllUser} from '../../Redux/reducer/AccountReducer';
import {getCar} from '../../Redux/reducer/CarReducer';
import moment from 'moment';
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
};

const Home = () => {
  const dispatch = useDispatch();
  const bills = useSelector(state => state.PaymentHistoryReducer.bills ?? []);
  const categories = useSelector(state => state.CategoryReducer.listCategory);
  const userStatus = useSelector(state => state.AccountReducer.listAcc?.status);
  const [value, setValue] = useState(moment());
  const preValue = moment(value).set('month', moment(value).get('month') - 1);
  const listUser = useSelector(
    state => state.AccountReducer?.listAcc?.listUser || [],
  );
  const cars = useSelector(state => state.CarReducer.listCar);
  const carStatus = useSelector(state => state.CarReducer.status);
  // const handleData = data => {
  //   const list = [];
  //   data.forEach(element => {
  //     list.push({
  //       title: element.full_name,
  //       extendedProps: {
  //         item: element,
  //       },
  //       date: element.date_meeting,
  //     });
  //   });
  //   console.log(list);
  //   return list;
  // };
  // const meetings = useSelector(state =>
  //   handleData(state.BookingReducer.listBooking),
  // );
  // const meetingStatus = useSelector(state => state.BookingReducer.status);

  // useEffect(() => {
  //   dispatch(getBooking('admin@gmail.com'));
  // }, [meetingStatus]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [userStatus]);
  useEffect(() => {
    dispatch(getCar({start: 0, end: 100}));
  }, [carStatus]);

  const handleOverall = () => {
    let overall = 0;
    formatBills(value).forEach(el => (overall += el.car.prices));
    return overall;
  };
  const handleChange = newValue => {
    if (!newValue) {
      setValue(moment());
      return;
    }
    if (moment().get('year') < moment(newValue).get('year')) {
      toast.error('Please choose current or previous date');
      return;
    } else if (moment().get('year') === moment(newValue).get('year')) {
      if (moment(newValue).get('month') > moment().get('month')) {
        toast.error('Please choose current or previous date');
        return;
      }
    }
    setValue(newValue);
  };
  // User have no meeting
  const getNewUser = () => {
    const list = listUser.filter(el => el.meetings.length > 0);
    return list;
  };
  // Top user
  const cloneListUser = () => {
    return listUser.map(el => {
      return {
        ...el,
        payed: el.meetings.filter(e => e.status_payment).length,
      };
    });
  };
  const getTopUser = () => {
    return cloneListUser().sort((a, b) => b.payed - a.payed);
  };
  // Top car
  const cloneListCar = () => {
    const list = [];

    bills.forEach(el => {
      if (list.filter(e => e.car_name === el.car.car_name).length < 1) {
        list.push({...el.car, count: 1});
      } else {
        list.map(e => {
          return {
            ...e,
            ...(e.car_name === el.car.car_name ? {count: e.count++} : {}),
          };
        });
      }
    });
    return list;
  };
  const getTopCar = () => {
    return cloneListCar().sort((a, b) => b.count - a.count);
  };
  const getRating = name => {
    if (cars?.length < 1) {
      return 0;
    }
    const listComments =
      cars.filter(el => el.name === name)[0]?.list_comments || [];
    if (listComments.length < 1) {
      return 0;
    }
    return (
      listComments?.map(cmt => cmt.rating).reduce((total, a) => total + a, 0) /
      listComments.length
    );
  };
  // Today booking
  const getTodayBooking = () => {
    const list = bills.filter(
      el => moment(el.selling_date).month() === moment(new Date()).month(),
    );
    return list;
  };

  const formatBills = month => {
    const list = bills.filter(
      el => moment(el.selling_date).month() === moment(month).month(),
    );
    return list;
  };

  const handleCategoryData = () => {
    const data = [];
    const monthData = formatBills(value);
    if (!bills) {
      return [100];
    }
    categories.forEach(element => {
      const list = [];
      monthData.forEach(el => {
        if (el.car.category === element.name) {
          list.push(el);
        }
      });
      monthData.length > 0
        ? data.push((list.length / bills.length) * 100)
        : data.push(0);
    });
    monthData.length < 1 && data.push(100);
    return data;
  };

  const handleMonthData = month => {
    const data = [];
    if (!bills) {
      return [];
    }
    categories.forEach(element => {
      const list = [];
      formatBills(month).forEach(el => {
        if (el.car.category === element.name) {
          list.push(el);
        }
      });
      data.push(list.length);
    });
    return data;
  };

  useEffect(() => {
    dispatch(getBills());
    dispatch(getCategory());
  }, []);

  // const lineData = {
  //   labels: categories.map(el => el.name),
  //   datasets: [
  //     {
  //       label: `Month: ${moment(value).month() + 1}`,
  //       data: handleMonthData(value),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: `Month: ${
  //         moment(value).month() === 0 ? 12 : moment(value).month()
  //       }`,
  //       data: handleMonthData(preValue),
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  const pieLabels = () => {
    const labels = categories.map(el => el.name);
    if (formatBills(value).length < 1) {
      labels.push('empty');
    }
    return labels;
  };

  const data = {
    labels: pieLabels(),
    datasets: [
      {
        label: '# of Votes',
        data: handleCategoryData(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          formatBills(value).length < 1 && 'rgba(200, 200, 200, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          formatBills(value).length < 1 && 'rgba(100, 100, 100, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-page-container">
      <div className="month-picker-container">
        <div className="statistic-item__summary">
          <div className="statistic-item__summary__group">
            <div className="statistic-item__summary--card">
              <Icon
                baseClassName="fas"
                className="fa-bell summary-icon"
                sx={{fontSize: 18, padding: 0.5, color: '	#00f9ff'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`${
                  getTodayBooking().length
                }`}</div>
                <div className="statistic-item__summary-description">
                  Booking for today
                </div>
              </div>
            </div>
            <div className="statistic-item__summary--card">
              <Icon
                baseClassName="fas"
                className="fa-car-side summary-icon"
                sx={{fontSize: 18, padding: 0.5, color: '#6565bf'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`${
                  getTopUser().length
                } user(s)`}</div>
                <div className="statistic-item__summary-description">
                  New registor
                </div>
              </div>
            </div>
          </div>
          <div className="statistic-item__summary__group">
            <div className="statistic-item__summary--card">
              <Icon
                baseClassName="fas"
                className="fa-hand-holding-dollar summary-icon"
                sx={{fontSize: 18, padding: 0.5, color: '	#00f9ff'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`$${handleOverall()}`}</div>
                <div className="statistic-item__summary-description">
                  Earned this month
                </div>
              </div>
            </div>
            <div className="statistic-item__summary--card">
              <Icon
                baseClassName="fas"
                className="fa-car-side summary-icon"
                sx={{fontSize: 18, padding: 0.5, color: '#6565bf'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`${
                  formatBills(value).length
                } car(s)`}</div>
                <div className="statistic-item__summary-description">
                  Selled this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="statistic-group">
        <div className="statistic-group__top">
          <div className="statistic-item">
            <div className="statistic-title">Category</div>
            <Pie data={data} />
          </div>
          <div className="filter-group">
            <div className="month-picker">
              <div className="month-picker-title">Pick a year</div>
              <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                inputProps={{'aria-label': 'Without label'}}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
            <div className="month-picker">
              <div className="month-picker-title">Pick a year</div>
              <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                inputProps={{'aria-label': 'Without label'}}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="statistic-list">
          <div className="top-car">
            <div className="statistic-title">Top Seller</div>
            <div className="top-car-container">
              {getTopCar().length > 0 &&
                getTopCar().map((item, index) => {
                  if (index < 3) {
                    return (
                      <div className="top-car__item" key={index}>
                        <img
                          className="top-car__item__image"
                          src={item.image || defaultAvatar}
                        />
                        <div className="top-car__item__detail">
                          <div className="order">Top {index + 1}</div>
                          <div className="top-car__info">
                            <h2 className="top-car__info__name">
                              {item.car_name}
                            </h2>
                            <Rating
                              name="half-rating-read"
                              defaultValue={0}
                              precision={0.1}
                              value={getRating(item.car_name)}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="top-car__item__count">
                          <div className="show-more">more</div>
                          <h2>{item.count} car(s)</h2>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="top-user-container">
            <div className="statistic-title">Top User</div>
            <div className="top-user">
              {getTopUser().map((item, index) => {
                if (index < 5) {
                  return (
                    <div className="top-user__item" key={index}>
                      <img
                        className="top-user__item__image"
                        src={item.image || defaultAvatar}
                      />
                      <div className="top-user__detail">
                        <div className="order-name">
                          {index + 1}.{item.name}
                        </div>
                        <div className="order-name">
                          <Icon
                            baseClassName="fas"
                            className="fa-bell summary-icon"
                            sx={{fontSize: 18, padding: 0.5, color: '	#00f9ff'}}
                          />
                          {item.payed} {"payment(s)"}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
