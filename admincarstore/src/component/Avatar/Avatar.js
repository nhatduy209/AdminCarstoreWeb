/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';

const Avatar = (user, avatarSize) => {
  
  return (
    <div className="avatar-component">
      <img className={avatarSize ? `avatar-component__image ${avatarSize}` : 'avatar-component__image'}
      src={user?.image ? user.image : defaultAvatar}/>
      <div className='avatar-component__online-status'></div>
    </div>
  );
};

export default Avatar;
