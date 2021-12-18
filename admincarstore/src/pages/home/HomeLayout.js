/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { useState } from 'react';
import Navigator from '../../component/navigator/Navidator';
import Header from '../../component/header/Header';
import {
  Routes ,
  Route,
} from "react-router-dom";
import CarManagement from '../car-management/CarManagement';
import Home from '../home-page/home';
import StoreInfo from '../store-info/StoreInfo';
import Booking from '../booking/Booking';

const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`main-layout ${isOpen ? 'collapse' : ''}`}>
        {Navigator(isOpen)}
        <div className='main-page'>
          {Header(setIsOpen,isOpen)}
          <Routes>
            <Route exact path="*" element={<Home/>} />
            <Route path="/list" element={<CarManagement/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/store-info" element={<StoreInfo/>} />
          </Routes>
        </div>
      </div>
  )
}

export default HomeLayout;
