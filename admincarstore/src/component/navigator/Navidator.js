/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {linksList} from './index';
import {Icon} from '@mui/material';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useState} from 'react';
import { clearAccountInfo } from '../../Redux/reducer/AccountReducer';
import {showProfile} from '../../Redux/reducer/GlobalReducer';
import defaultAvatar from '../../assets/img/default-avatar.svg';

const Navigator = isOpen => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const info = useSelector(state => state.AccountReducer.account);
  const isShow = useSelector(state => state.GlobalReducer.isShowProfile);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  window.addEventListener('resize', (width) => {
    if(width.target.innerWidth < 991) {
      setHideMenu(true);
    } else {
      setHideMenu(false);
    }
  }, true);
  const logout = () => {
    dispatch(clearAccountInfo());
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className={`navigator-container ${isOpen ? 'collapse' : ''} ${hideMenu ? 'hide' : ''}`}>
      <div className="navigator-header">
        <img
        // onClick={() => navigate('/profile')}
        onClick={() => dispatch(showProfile(!isShow))}
          className="navigator-header__avatar"
          src={info.image.length < 1 ? defaultAvatar : info.image }></img>
        <div className="navigator-header__info">{info.name}</div>
        <div className="navigator-header__info">{info.email}</div>
      </div>
      <div className="navigator-menu">
        {linksList.map((item, index) => {
          return (
            <Link to={item.path} key={index}
            className={`navigator-item ${location.pathname === item.path ? 'item-selected' : ''}`}>
              <Icon
                baseClassName="fas"
                className={`${item.icon}`}
                sx={{fontSize: 16, padding: 1}}
              />
              <div className='navigator-item__title'>{item.title}</div>
            </Link>
          );
        })}
      </div>
      <div onClick={() => logout()} className={`navigator-item log-out-item`}>
          <Icon
            baseClassName="fas"
            className="fa-right-from-bracket"
            sx={{fontSize: 16, padding: 1}}
          />
          <div className='navigator-item__title'>Log out</div>
        </div>
    </div>
  );
};

export default Navigator;
