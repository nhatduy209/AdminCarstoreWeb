/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { Icon } from '@mui/material';

const Header = (toggleDrawer,isOpen) => {
  return (
    <div className={`header-container ${isOpen ? 'collapse' : ''}`}>
        <div className='header-content'>
        <Icon baseClassName="fas"
        className={!isOpen ? 'fas fa-angles-left' : 'fas fa-angles-right'}
        onClick={() => toggleDrawer(!isOpen)} sx={{ fontSize: 24 }} />
        <img className='mini-avatar' src='https://i.ytimg.com/vi/bXUblyGMU8Q/hqdefault.jpg'></img>
        </div>
    </div>
  );
}

export default Header;
