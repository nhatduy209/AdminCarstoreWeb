/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import { useState } from 'react';
import Navigator from '../../component/navigator/Navidator';
import Header from '../../component/header/Header';

const HomeLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='main-layout'>
        <Navigator/>
        <div className='main-page'>
          {Header(setIsOpen,isOpen)}
          hello
        </div>
      </div>
  )
}

export default HomeLayout;
