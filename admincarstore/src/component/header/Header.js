/* eslint-disable react/react-in-jsx-scope */
import './style.scss';

const Header = (toggleDrawer,isOpen) => {
  return (
    <div className="header-container">
        <div className='header-content'>
        {/* <i className={isOpen ? 'fas fa-arrow-left' : 'fas fa-arrow-right'}></i> */}
        <i className={!isOpen ? 'fas fa-arrow-left' : 'fas fa-arrow-right'} onClick={() => toggleDrawer(!isOpen)}></i>
        <img className='mini-avatar' src='https://i.ytimg.com/vi/bXUblyGMU8Q/hqdefault.jpg'></img>
        </div>
    </div>
  );
}

export default Header;
