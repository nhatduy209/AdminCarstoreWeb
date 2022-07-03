/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import * as React from 'react';
import {Icon} from '@mui/material';
import Badge from '@mui/material/Badge';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {showProfile} from '../../Redux/reducer/GlobalReducer';
import defaultAvatar from '../../assets/img/default-avatar.svg';
import {useState} from 'react';
import {NotificaitonBooking} from '../notification/Notification';

import {io} from 'socket.io-client';
import {URL_NGROK} from '../../Config/Url/URL';

const socket = io(URL_NGROK, {
  transports: ['websocket'],
});

const Header = (toggleDrawer, isOpen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = useSelector(state => state.AccountReducer.account);
  const isShow = useSelector(state => state.GlobalReducer.isShowProfile);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  const [showNotification, setShowNotification] = useState(false);
  const [checkBooking, setCheckBooking] = useState(false);
  const toggleProfile = status => {
    dispatch(showProfile(status));
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

  socket.on('receive_booking_from_admin', booking => {
    if (checkBooking == false) {
      setCheckBooking(true);
    }
  });

  const handleCheckBooking = () => {
    setShowNotification(!showNotification);
    setCheckBooking(false);
  };

  return (
    <div className={`header-container ${isOpen ? 'collapse' : ''}`}>
        <div className='header-content'>
          {
            hideMenu ? <div className="icon icon__collapse toggle-button" onClick={() => toggleDrawer(!isOpen)}></div> :
            <Icon baseClassName="fas"
            className={!isOpen ? 'fas fa-angles-left toggle-button' : 'fas fa-angles-right toggle-button'}
            onClick={() => toggleDrawer(!isOpen)} sx={{ fontSize: 24 }} />
          }
          <div className='header__noti-group-button'>
          <Badge color="secondary" className='toggle-button' overlap="circular" badgeContent=" " variant="dot">
            <div className='icon icon__message' onClick={() => navigate('/message')}></div>
            </Badge>
            <Badge color="secondary" className='toggle-button' overlap="circular" badgeContent=" " variant="dot">
            <div className='icon icon__notification'></div>
            </Badge>
          <img onClick={() => toggleProfile(!isShow)} className='mini-avatar toggle-button' src={info?.image || defaultAvatar }></img>
        </div>
      </div>
      {showNotification && <NotificaitonBooking />}
    </div>
  );
};

export default Header;
