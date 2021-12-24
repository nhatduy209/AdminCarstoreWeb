/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { useState} from 'react';
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
import User from '../user/user';
import PaymentHistory from '../payment-history/PaymentHistory';
import Profile from '../profile/Profile';

const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  window.addEventListener('resize', (width) => {
    if(width.target.innerWidth < 991) {
      setHideMenu(true);
    } else {
      setHideMenu(false);
    }
  }, true);
  return (
    <div className={`main-layout ${isOpen ? 'collapse' : ''} ${hideMenu ? 'hide' : ''}`}>
        {Navigator(isOpen)}
        <div className='main-page'>
          {Header(setIsOpen,isOpen)}
          <Routes>
            <Route exact path="*" element={<Home/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/list" element={<CarManagement/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/store-info" element={<StoreInfo/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/payment-history" element={<PaymentHistory/>} />
          </Routes>
        </div>
      </div>
  )
}

export default HomeLayout;
