/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import {formatTimeDuration} from '../../../../helps/formatter';

const MessageItem = (side, message, isShowInfo, isShowTime, isToday) => {
  const getMail = () => {
    return message?.id?.split('_')[1] || '--';
  };
  const getMessageTime = () => {
    return message?.time ? formatTimeDuration(new Date(message?.time)) : '...';
  };

  return (
    <div key={message?.id}>
      {isToday && (
        <div
          className={`message-item`}
          style={{
            fontColor: '#eee',
            fontSize: '12px',
            justifyContent: 'center',
          }}>
          Today
        </div>
      )}
      {isShowTime && (
        <div
          className={`message-item`}
          style={{
            fontColor: '#eee',
            fontSize: '12px',
            justifyContent: 'center',
          }}>
          {getMessageTime()}
        </div>
      )}
      {(isShowInfo || isShowTime) && !message?.shareItem && (
        <div
          className={`message-item ${side || ''}`}
          style={{fontWeight: 'bold', marginInline: '12px'}}>
          {side === 'left' ? getMail() : 'Me'}
        </div>
      )}
      <div
        className={`message-item ${side || ''} ${
          message?.shareItem ? 'share-item' : ''
        }`}>
        {message?.content && (
          <div className={`message-item__content ${side || ''}`}>
            <div className="text">{message.content}</div>
          </div>
        )}
        {message?.shareItem && (
          <div style={message.shareItem && {'cursor': 'pointer'}}
          className={`message-item__share-item`}>
            <img
              className="message-item__share-item__image"
              src={message?.shareItem.img || ''}
            />
            <div className="message-item__share-item__text">
              <p>{message?.shareItem.name}</p>
              <p>({message?.shareItem.category})</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
