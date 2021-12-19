/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {linksList} from './index';
import {Icon} from '@mui/material';
import {Link, useLocation } from 'react-router-dom';

const Navigator = isOpen => {
  const location = useLocation();
  return (
    <div className={`navigator-container ${isOpen ? 'collapse' : ''}`}>
      <div className="navigator-header">
        <img
          className="navigator-header__avatar"
          src="https://i.ytimg.com/vi/bXUblyGMU8Q/hqdefault.jpg"></img>
        <div className="navigator-header__info">Thiếu nữ áo đen</div>
        <div className="navigator-header__info">camLanSuc@gmail.com</div>
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
    </div>
  );
};

export default Navigator;
