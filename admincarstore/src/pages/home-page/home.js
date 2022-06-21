/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import {Icon} from '@mui/material';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Pie, Line} from 'react-chartjs-2';
import {getBills} from '../../Redux/reducer/PaymentHistoryReducer';
import {getCategory} from '../../Redux/reducer/CategoryReducer';
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
  const [value, setValue] = useState(moment());
  const preValue = moment(value).set('month', moment(value).get('month') - 1);

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

  // const formatBills = month => {
  //   const list = bills.filter(
  //     el => moment(el.selling_date).month() === moment(month).month(),
  //   );
  //   return list;
  // };

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

  const lineData = {
    labels: categories.map(el => el.name),
    datasets: [
      {
        label: `Month: ${moment(value).month() + 1}`,
        data: handleMonthData(value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `Month: ${
          moment(value).month() === 0 ? 12 : moment(value).month()
        }`,
        data: handleMonthData(preValue),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const pieLabels = () => {
    const labels = categories.map(el => el.name);
    if (formatBills(value).length < 1) {
      labels.push('empty');
    }
    console.log(labels);
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
          formatBills(value).length < 1 && 'rgba(255, 159, 64, 0)',
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                <div className="statistic-item__summary-content">{`$${handleOverall()}`}</div>
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
                  formatBills(value).length
                } car(s)`}</div>
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
          <div className="top-car">
            <h1>Top Seller</h1>
            <div className="top-car__item">
              <div className="top-car__item__image"></div>
              <div className="top-car__item__detail">
                <div className="order">top</div>
                <div className="top-car__info">
                  <h2 className="top-car__info__name">name</h2>
                </div>
              </div>
              <div className="top-car__item__count">
                <div className="show-more">more</div>
                <h2>12 car(s)</h2>
              </div>
            </div>
            <div className="top-car__item">
              <div className="top-car__item__image"></div>
              <div className="top-car__item__detail">
                <div className="order">top</div>
                <div className="top-car__info">
                  <h2 className="top-car__info__name">name</h2>
                </div>
              </div>
              <div className="top-car__item__count">
                <div className="show-more">more</div>
                <h2>12 car(s)</h2>
              </div>
            </div>
            <div className="top-car__item">
              <div className="top-car__item__image"></div>
              <div className="top-car__item__detail">
                <div className="order">top</div>
                <div className="top-car__info">
                  <h2 className="top-car__info__name">name</h2>
                </div>
              </div>
              <div className="top-car__item__count">
                <div className="show-more">more</div>
                <h2>12 car(s)</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-group">
          {/* <div className="month-picker">
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
          </div> */}
        </div>
        <h1>Top User</h1>
        <div className="top-user">
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
          <div className="top-user__item">
            <img className="top-user__item__image" src={defaultAvatar} />
            <div>
              <div className="order">top</div>
              <div className="top-user__info">
                <h3 className="top-user__info__name">name</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="statistic-group__chart">
          <div className="statistic-item-revenue">
            <div className="statistic-item month-detail">
              <div className="statistic-title">Month Statistic</div>
              <Line options={options} data={lineData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
