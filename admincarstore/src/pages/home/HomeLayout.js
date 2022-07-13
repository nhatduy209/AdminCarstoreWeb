/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Navigator from '../../component/navigator/Navidator';
import Header from '../../component/header/Header';
import {Routes, Route} from 'react-router-dom';
import CarManagement from '../car-management/CarManagement';
import Home from '../home-page/home';
import StoreInfo from '../store-info/StoreInfo';
import Booking from '../booking/Booking';
import User from '../user/user';
import PaymentHistory from '../payment-history/PaymentHistory';
import Profile from '../profile/Profile';
import Dialog from '@mui/material/Dialog';
import {showProfile, showStore} from '../../Redux/reducer/GlobalReducer';
import Message from '../message/Message';
import {getListMessage} from '../../Redux/reducer/MessageReducer';
import {io} from 'socket.io-client';
import {URL_MESSAGE} from '../../Config/Url/URL';
import {toast, ToastContainer} from 'react-toastify';
import NotificationCard from '../home-page/Component/notificationCard/NotificationCard';
import {getAllUser} from '../../Redux/reducer/AccountReducer';
import {UNATHORIZE_MESSAGE} from '../../Config/Status/Index';
const socket = io(URL_MESSAGE, {transports: ['websocket']});

const HomeLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  const isShow = useSelector(state => state.GlobalReducer.isShowProfile);
  const isShowStore = useSelector(state => state.GlobalReducer.isShowStore);
  const transitionStyles = {enter: 300, exit: 500};
  const conversations = useSelector(state => state.MessageReducer.listConv);
  const conversationsStatus = useSelector(state => state.MessageReducer.status);
  const statusAuth = useSelector(state => state.MessageReducer.statusAuth);
  const listUser = useSelector(
    state => state.AccountReducer?.listAcc?.listUser,
  );
  useEffect(() => {
    dispatch(getAllUser());
  }, [listUser?.length]);
  useEffect(() => {
    if (statusAuth !== UNATHORIZE_MESSAGE) {
      if (conversations?.length > 0) {
        conversations.forEach(element => {
          socket.on(element.idSendingFromClient || '', async dataFromServer => {
            const user = listUser.filter(el =>
              element.id.toString().includes(el.email),
            );
            if (user && user.length > 0) {
              await dispatch(getListMessage());
              toast(
                NotificationCard({
                  ...user[0],
                  image: user[0].image,
                  content: dataFromServer.data,
                  type: 'message',
                  handleClick: () => navigate('/message')
                }),
                {
                  position: toast.POSITION.TOP_RIGHT,
                },
              );
            }
          });
        });
      } else {
        dispatch(getListMessage());
        socket.on('receive_booking_from_admin', async res => {
          const user = listUser.filter(el =>
            res.data.clients_email.toString().includes(el.email),
          );
          console.log(user, res.data, listUser);
          if (user && user.length > 0) {
            toast(
              NotificationCard({
                ...user[0],
                image: user[0].image,
                content: `${user[0].name} just request a meeting!!`,
                type: 'booking',
                handleClick: () => navigate('/booking')
              }),
              {
                position: toast.POSITION.TOP_RIGHT,
              },
            );
          }
        });
      }
    } else {
      console.log('HELLO UNAUTH');
    }
  }, [conversationsStatus, conversations?.length]);

  const handleClose = () => {
    dispatch(showProfile(!isShow));
  };
  const handleCloseStoreForm = () => {
    dispatch(showStore(!isShowStore));
  };
  window.addEventListener(
    'resize',
    width => {
      if (width.target.innerWidth < 991) {
        setHideMenu(true);
      } else {
        setHideMenu(false);
      }
    },
    true,
  );
  return (
    <div
      className={`main-layout ${isOpen ? 'collapse' : ''} ${
        hideMenu ? 'hide' : ''
      }`}>
      <ToastContainer
        position="top-right"
        // autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      {Navigator(isOpen, setIsOpen)}
      <div className="main-page">
        {Header(setIsOpen, isOpen)}
        <Routes>
          <Route exact path="*" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/list" element={<CarManagement />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/message" element={<Message />} />
        </Routes>
        <Dialog
          open={isShow}
          onClose={handleClose}
          transitionDuration={transitionStyles}
          className="profile-toggle">
          {Profile()}
        </Dialog>
        <Dialog
          open={isShowStore}
          onClose={handleCloseStoreForm}
          transitionDuration={transitionStyles}
          className="store-info-toggle">
          {StoreInfo()}
        </Dialog>
      </div>
    </div>
  );
};

export default HomeLayout;
