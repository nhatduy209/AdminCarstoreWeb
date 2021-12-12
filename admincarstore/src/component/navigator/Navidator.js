/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { linksList } from './index';

function Navigator() {

  return (
    <div className="navigator-container">
        <div className='navigator-header'>
            <img className='navigator-header__avatar' src='https://i.ytimg.com/vi/bXUblyGMU8Q/hqdefault.jpg'></img>
            <div className='navigator-header__info'>Thiếu nữ áo đen</div>
            <div className='navigator-header__info'>camLanSuc@gmail.com</div>
        </div>
        <div className='navigator-menu'>
        {linksList.map((item, index) => {
            return <div key={index} className="navigator-item">
                <i className={`${item.icon} fa-lg`}></i>
                <a href={item.link} target="_blank" rel="noreferrer"><div>{item.title}</div></a>
            </div>
        })}
        </div>
    </div>
  );
}

export default Navigator;
