/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import { getBills } from '../../Redux/reducer/PaymentHistoryReducer';
import { getCategory } from '../../Redux/reducer/CategoryReducer';
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const lineData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3, 0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [12, 19, 3, 5, 2, 3, 0],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const Home = () => {
  const dispatch = useDispatch();
  
  const bills = useSelector(state => {
    state.PaymentHistoryReducer.bills ?? [];
  });
  const categories = useSelector(state => state.CategoryReducer.listCategory.map((el) => {return el.name}));
  console.log('labels', categories, bills);

  const handleCategoryData = () => {
    const data = [];
    if(!bills) {
      return [];
    }
    categories.forEach(element => {
      const list = []
      bills.forEach((el) => {
        if(el.car.categry === element) {
          list.push(el);
        }
      })
      data.push(list.length / bills.length * 100);
    });
    return data;
  }

  useEffect(() => {
    dispatch(getBills());
    dispatch(getCategory());
  }, []);

  const data = {
    labels: categories,
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
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-page-container">
      <div className='statistic-title'>Category</div>
        <Pie data={data} />
        <div className='statistic-title'>Month Statistic</div>
        <Line options={options} data={lineData} />
    </div>
  );
};

export default Home;
