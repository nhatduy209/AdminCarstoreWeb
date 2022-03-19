/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {linksList} from './index';
import {Icon} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useState} from 'react';
import { clearAccountInfo } from '../../Redux/reducer/AccountReducer';
import {showStore} from '../../Redux/reducer/GlobalReducer';
import defaultAvatar from '../../assets/img/default-avatar.svg';
import logo from '../../assets/img/logo.svg';
import logoCollapse from '../../assets/img/logo.svg';

const Navigator = (isOpen, setIsOpen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isShow = useSelector(state => state.GlobalReducer.isShowStore);
  const [hideMenu, setHideMenu] = useState(window.innerWidth < 991);
  const transitionStyles = { enter: 300, exit: 500 }
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
  const showStoreInfo = (item) => {
    if (!item.path) {
      dispatch(showStore(!isShow));
    }
  }
  if (!hideMenu) {
    return (
      <div className={`navigator-container ${isOpen && !hideMenu ? 'collapse' : ''}`}>
        <div className="navigator-header">
          <img
          // onClick={() => navigate('/profile')}
          onClick={() => dispatch(showStore(!isShow))}
            className={`navigator-header__avatar ${isOpen && !hideMenu ? 'collapse' : ''}`}
            src={isOpen && !hideMenu ? logoCollapse : logo}></img>
          <div className="navigator-header__info"></div>
        </div>
        <div className="navigator-menu">
          {linksList.map((item, index) => {
            return (
              <Link to={item.path} key={index}
              onClick={() => showStoreInfo(item)}
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
  } else {
    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(!isOpen)} transitionDuration={transitionStyles} className='navigation-toggle'>
        <div className={`navigator-container ${isOpen && !hideMenu ? 'collapse' : ''}`}>
        <div className="navigator-header">
          <img
          // onClick={() => navigate('/profile')}
          onClick={() => dispatch(showStore(!isShow))}
            className="navigator-header__avatar"
            src={defaultAvatar}></img>
          <div className="navigator-header__info"></div>
        </div>
        <div className="navigator-menu">
          {linksList.map((item, index) => {
            return (
              <Link to={item.path} key={index}
              className={`navigator-item ${location.pathname === item.path ? 'item-selected' : ''}`}>
                <Icon
                  baseClassName="fas"
                  className={`${item.icon}${location.pathname === item.path ? '-active' : ''}`}
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
      </Dialog>
    );
  }
};

export default Navigator;
