/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';

const MessageItem = (side, text) => {
  
  return (
    <div className={`message-item ${side || ''}`}>
      <div className={`message-item__content ${side || ''}`}>
      <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default MessageItem;
