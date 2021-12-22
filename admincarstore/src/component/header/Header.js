/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { Icon } from '@mui/material';
import {useSelector} from 'react-redux';
import defaultAvatar from '../../assets/img/default-avatar.svg'

const Header = (toggleDrawer,isOpen) => {
  const info = useSelector(state => state.AccountReducer.account);
  return (
    <div className={`header-container ${isOpen ? 'collapse' : ''}`}>
        <div className='header-content'>
        <Icon baseClassName="fas"
        className={!isOpen ? 'fas fa-angles-left' : 'fas fa-angles-right'}
        onClick={() => toggleDrawer(!isOpen)} sx={{ fontSize: 24 }} />
        <img className='mini-avatar' src={info.avatar.length < 1 ? defaultAvatar : info.avatar }></img>
        </div>
    </div>
  );
}

export default Header;
