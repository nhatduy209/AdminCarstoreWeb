/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import * as React from 'react';
import { Icon } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {showProfile} from '../../Redux/reducer/GlobalReducer'
import defaultAvatar from '../../assets/img/default-avatar.svg'
import {useState} from 'react';

const Header = (toggleDrawer,isOpen) => {
  const dispatch = useDispatch();
  const info = useSelector(state => state.AccountReducer.account);
  const isShow = useSelector(state => state.GlobalReducer.isShowProfile);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  const toggleProfile = (status) => {
    dispatch(showProfile(status));
  }
  window.addEventListener('resize', (width) => {
    if(width.target.innerWidth < 991) {
      setHideMenu(true);
    } else {
      setHideMenu(false);
    }
  }, true);
  return (
    <div className={`header-container ${isOpen ? 'collapse' : ''}`}>
        <div className='header-content'>
          {
            hideMenu ? <div className="icon icon__collapse" onClick={() => toggleDrawer(!isOpen)}></div> :
            <Icon baseClassName="fas"
            className={!isOpen ? 'fas fa-angles-left' : 'fas fa-angles-right'}
            onClick={() => toggleDrawer(!isOpen)} sx={{ fontSize: 24 }} />
          }
        <img onClick={() => toggleProfile(!isShow)} className='mini-avatar' src={info.image.length < 1 ? defaultAvatar : info.image }></img>
        </div>
    </div>
  );
}

export default Header;
