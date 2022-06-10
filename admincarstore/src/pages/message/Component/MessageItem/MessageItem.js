/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import { formatTimeDuration } from '../../../../helps/formatter';

const MessageItem = (side, message, isShowInfo) => {
  const getMail = () => {
    return message?.id?.split('_')[1] || "--";
  }
  const getMessageTime = () => {
    return message?.time ?
    formatTimeDuration(new Date(message?.time)) : '...'
  }
  
  return (
    <div key={message?.id}>
    {isShowInfo  && <div className={`message-item ${side || ''}`} style={{fontWeight: "bold", marginInline: "12px"}}>
      {side === 'left' ? getMail() : 'Me'}
      </div>}
    <div className={`message-item ${side || ''}`}>
      <div className={`message-item__content ${side || ''}`}>
      <div className="text">{message.content}</div>
      </div>
    </div>
    {/* {<div className={`message-item ${side || ''}`} style={{fontColor: '#eee', fontSize: "12px"}}>
      {getMessageTime()}
      </div>} */}
    </div>
  );
};

export default MessageItem;
