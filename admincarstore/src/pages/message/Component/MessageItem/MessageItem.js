/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import { formatTimeDuration } from '../../../../helps/formatter';

const MessageItem = (side, message, isShowInfo, isShowTime, isToday) => {
  const getMail = () => {
    return message?.id?.split('_')[1] || "--";
  }
  const getMessageTime = () => {
    return message?.time ?
    formatTimeDuration(new Date(message?.time)) : '...'
  }
  
  return (
    <div key={message?.id}>
      {isToday && <div className={`message-item`} style={{fontColor: '#eee', fontSize: "12px", justifyContent: 'center'}}>
      Today
      </div>}
    {isShowTime && <div className={`message-item`} style={{fontColor: '#eee', fontSize: "12px", justifyContent: 'center'}}>
      {getMessageTime()}
      </div>}
    {(isShowInfo || isShowTime)  && <div className={`message-item ${side || ''}`} style={{fontWeight: "bold", marginInline: "12px"}}>
      {side === 'left' ? getMail() : 'Me'}
      </div>}
    <div className={`message-item ${side || ''}`}>
      <div className={`message-item__content ${side || ''}`}>
      <div className="text">{message.content}</div>
      </div>
    </div>
    </div>
  );
};

export default MessageItem;
