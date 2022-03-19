/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import Dialog from '@mui/material/Dialog';
import {showProfile, showStore} from '../../Redux/reducer/GlobalReducer'
import Message from '../message/Message';

const HomeLayout = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  const isShow = useSelector(state => state.GlobalReducer.isShowProfile);
  const isShowStore = useSelector(state => state.GlobalReducer.isShowStore);
  const transitionStyles = { enter: 300, exit: 500 }
  const handleClose = () => {
    dispatch(showProfile(!isShow));
  }
  const handleCloseStoreForm = () => {
    dispatch(showStore(!isShowStore));
  }
  window.addEventListener('resize', (width) => {
    if(width.target.innerWidth < 991) {
      setHideMenu(true);
    } else {
      setHideMenu(false);
    }
  }, true);
  return (
    <div className={`main-layout ${isOpen ? 'collapse' : ''} ${hideMenu ? 'hide' : ''}`}>

        {Navigator(isOpen, setIsOpen)}
        <div className='main-page'>
          {Header(setIsOpen,isOpen)}
          <Routes>
            <Route exact path="*" element={<Home/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/list" element={<CarManagement/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/payment-history" element={<PaymentHistory/>} />
            <Route path="/message" element={<Message/>} />
          </Routes>
          <Dialog open={isShow} onClose={handleClose} transitionDuration={transitionStyles} className='profile-toggle'>
            {Profile()}
          </Dialog>
          <Dialog open={isShowStore} onClose={handleCloseStoreForm} transitionDuration={transitionStyles} className='store-info-toggle'>
            {StoreInfo()}
          </Dialog>
        </div>
      </div>
  )
}

export default HomeLayout;
