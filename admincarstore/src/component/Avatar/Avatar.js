/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';

const Avatar = (user, avatarSize) => {
  
  return (
    <div className="avatar-component">
      <img className="avatar-component__image"
      width={avatarSize || "50px"}
      height={avatarSize || "50px"}
      src={user?.image ? user.image : defaultAvatar}/>
      <div className='avatar-component__online-status'></div>
    </div>
  );
};

export default Avatar;
