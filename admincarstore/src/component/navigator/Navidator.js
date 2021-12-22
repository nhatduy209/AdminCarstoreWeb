/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {linksList} from './index';
import {Icon} from '@mui/material';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { clearAccountInfo } from '../../Redux/reducer/AccountReducer';
import {token_authen} from '../../Config/Status/Key'
import defaultAvatar from '../../assets/img/default-avatar.svg'

const Navigator = isOpen => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const info = useSelector(state => state.AccountReducer.account);
  const logout = () => {
    dispatch(clearAccountInfo());
    localStorage.setItem(token_authen, null);
    navigate('/login');
  }
  return (
    <div className={`navigator-container ${isOpen ? 'collapse' : ''}`}>
      <div className="navigator-header">
        <img
        onClick={() => navigate('/profile')}
          className="navigator-header__avatar"
          src={info.avatar.length < 1 ? defaultAvatar : info.avatar }></img>
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
