/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {
  Icon,
  Rating,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Select from '@mui/material/Select';
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
import {Pie} from 'react-chartjs-2';
import {getBills} from '../../Redux/reducer/PaymentHistoryReducer';
import {getCategory} from '../../Redux/reducer/CategoryReducer';
import {getAllUser} from '../../Redux/reducer/AccountReducer';
import {getCar} from '../../Redux/reducer/CarReducer';
import moment from 'moment';
import {getBooking} from '../../Redux/reducer/BookingReducer';
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

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Home = () => {
  const dispatch = useDispatch();
  const bills = useSelector(state => state.PaymentHistoryReducer.bills ?? []);
  const categories = useSelector(state => state.CategoryReducer.listCategory);
  const userStatus = useSelector(state => state.AccountReducer.listAcc?.status);
  const [value, setValue] = useState(moment());
  const [filterType, setFilterType] = useState('range');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const listUser = useSelector(
    state => state.AccountReducer?.listAcc?.listUser || [],
  );
  const cars = useSelector(state => state.CarReducer.listCar);
  const carStatus = useSelector(state => state.CarReducer.status);
  const meetingStatus = useSelector(state => state.BookingReducer.status);
  const meetings = useSelector(state => state.BookingReducer.listBooking);
  const getListYear = () => {
    let currentYear = new Date().getFullYear();
    const list = [];
    for (currentYear; currentYear >= 2000; currentYear--) {
      list.push(currentYear);
    }
    return list;
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  useEffect(() => {
    dispatch(getCar({start: 0, end: 100}));
  }, [carStatus]);
  useEffect(() => {
    dispatch(getBooking('admin@gmail.com'));
  }, [meetingStatus]);

  const handleOverall = () => {
    let overall = 0;
    formatBills(value).forEach(el => (overall += el.car.prices));
    return overall;
  };
  // User have no meeting
  const getNewUser = () => {
    const list = listUser.filter(el => el.meetings.length < 1);
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
    const list = meetings.filter(
      el =>
        moment(el.date_meeting).toDate().getDate() ===
        moment(new Date()).toDate().getDate(),
    );
    return list;
  };

  const formatBills = data => {
    let list = [];
    if (month && year) {
      list = bills.filter(el => {
        return (
          moment(el.selling_date).month() + 1 === month &&
          moment(el.selling_date).year() === year
        );
      });
      return list;
    }
    if (startDate && endDate) {
      list = bills.filter(
        el =>
          moment(el.selling_date) > moment(startDate) &&
          moment(el.selling_date).year() < moment(endDate),
      );
      return list;
    }
    list = bills.filter(
      el => moment(el.selling_date).month() === moment(data).month(),
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
        ? data.push((list.length / monthData.length) * 100)
        : data.push(0);
    });
    monthData.length < 1 && data.push(100);
    return data;
  };

  const categoryFilter = () => {
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
      data.push({
        list,
        name: element.name,
        url: element.image,
      });
    });
    return data;
  };

  useEffect(() => {
    dispatch(getBills());
    dispatch(getCategory());
  }, []);

  const changeFilterType = (event, val) => {
    setFilterType(val);
    setMonth();
    setYear();
    setStartDate();
    setEndDate();
  };

  const pieLabels = () => {
    const labels = categories.map(el => el.name);
    if (formatBills(value).length < 1) {
      labels.push('empty');
    }
    return labels;
  };

  const data = () => {
    return {
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
                sx={{fontSize: 18, padding: 0.5, color: '	#006666'}}
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
                className="fa-user summary-icon"
                sx={{fontSize: 18, padding: 0.5, color: '#006666'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`${
                  getNewUser().length
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
                sx={{fontSize: 18, padding: 0.5, color: '	#006666'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`$${handleOverall()}`}</div>
              </div>
            </div>
            <div className="statistic-item__summary--card">
              <Icon
                baseClassName="fas"
                className="fa-car-side summary-icon"
                sx={{fontSize: 18, padding: 0.5, color: '#006666'}}
              />
              <div>
                <div className="statistic-item__summary-content">{`${
                  formatBills(value).length
                } car(s)`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="statistic-group">
        <div className="statistic-group__top">
          <div className="statistic-item">
            <div className="statistic-title">Category</div>
            <Pie data={data()} />
          </div>
          <div className="filter-group-container">
            <div className="filter-group">
              <ToggleButtonGroup
                color="primary"
                value={filterType}
                exclusive
                onChange={changeFilterType}>
                <ToggleButton value="range" disabled={filterType === 'range'}>
                  Range date
                </ToggleButton>
                <ToggleButton
                  value="element"
                  disabled={filterType === 'element'}>
                  Selected
                </ToggleButton>
              </ToggleButtonGroup>
              {filterType === 'element' && (
                <div className="filter-seleted-item row my-32">
                  <div className="month-picker mr-24">
                    <div className="month-picker-title text--label text--bold">
                      Month
                    </div>
                    <Select
                      style={{width: '163px'}}
                      value={month}
                      onChange={(event, val) => setMonth(val.props.value)}
                      displayEmpty
                      defaultValue={months[0]}
                      inputProps={{'aria-label': 'Without label'}}>
                      {months.map(item => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="month-picker">
                    <div className="month-picker-title text--label text--bold">
                      Year
                    </div>
                    <Select
                      style={{width: '163px'}}
                      value={year}
                      onChange={(event, val) => setYear(val.props.value)}
                      displayEmpty
                      defaultValue={getListYear()[0]}
                      inputProps={{'aria-label': 'Without label'}}>
                      {getListYear().map(item => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              )}
              {filterType === 'range' && (
                <div className="filter-range row my-32">
                  <div className="mr-24">
                    <div className="text--label text--bold">Start date</div>
                    <TextField
                      onChange={event => setStartDate(event.target.value)}
                      value={startDate}
                      type="date"></TextField>
                  </div>
                  <div>
                    <div className="text--label text--bold">End date</div>
                    <TextField
                      onChange={event => setEndDate(event.target.value)}
                      value={endDate}
                      type="date"></TextField>
                  </div>
                </div>
              )}
              {categoryFilter().map((item, index) => {
                return (
                  <div
                    key={index}
                    className="category-item row align-center my-16 pa-12">
                    <img
                      className="top-user__item__image"
                      src={item.url || defaultAvatar}
                    />
                    <div className="col">
                      <div className="text--bold">{item.name}</div>
                      <div className="row order-count">
                        {item.list?.length} car(s) are sold
                      </div>
                    </div>
                  </div>
                );
              })}
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
                          {/* <div className="show-more">more</div> */}
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
                        <div className="text--label row order-count">
                          <Icon
                            baseClassName="fas"
                            className="fa-receipt summary-icon"
                            sx={{fontSize: 18, padding: 0.5, color: '	#006666'}}
                          />
                          {item.payed} {'payment(s)'}
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
