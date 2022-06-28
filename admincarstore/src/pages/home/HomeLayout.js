/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { useEffect, useState} from 'react';
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
import { getListMessage } from '../../Redux/reducer/MessageReducer';
import { io, Socket } from 'socket.io-client';
import { URL_MESSAGE } from '../../Config/Url/URL';
import { toast, ToastContainer } from 'react-toastify';
const socket = io(URL_MESSAGE, {transports: ['websocket']});

const HomeLayout = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  const isShow = useSelector(state => state.GlobalReducer.isShowProfile);
  const isShowStore = useSelector(state => state.GlobalReducer.isShowStore);
  const transitionStyles = { enter: 300, exit: 500 }
  const conversations = useSelector(state => state.MessageReducer.listConv);
  const conversationsStatus = useSelector(state => state.MessageReducer.status);
  const listUser = useSelector(state => state.AccountReducer?.listAcc?.listUser || []);
  useEffect(() => {
    console.log(conversations);
    if(conversations.length > 0) {
      conversations.forEach(element => {
        console.log(element);
        socket.on(element.idSendingFromClient || '', dataFromServer => {
          const user = listUser.filter((el) => element.id.toString().includes(el.email));
          toast(user && user.length > 0 ? <div>
            <h3>{user[0].name}</h3>
            {console.log("hello")}
            {dataFromServer.data}
            </div> : <h1>hello</h1>, {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(getListMessage());
        });
      });
    } else {
      dispatch(getListMessage());
    }
  }, [conversationsStatus, conversations.length]);
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
        s
      />
      {/* Same as */}
      <h1>hello</h1>
      <ToastContainer />

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
