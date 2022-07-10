/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import {formatTimeDuration} from '../../../../helps/formatter';
export const ImageTemplate = 'https://firebasestorage.googleapis.com';

const MessageItem = (
  side,
  message,
  isShowInfo,
  isShowTime,
  isToday,
  showDetail,
) => {
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
          <div
            className={`message-item__content ${side || ''}`}
            style={{
              paddingBlock: message?.content?.includes(ImageTemplate)
                ? '8px'
                : '',
            }}>
            {message?.content?.includes(ImageTemplate) ? (
              <img
                className="message-item__share-item__image"
                src={message.content || ''}
              />
            ) : (
              <div className="text">{message.content}</div>
            )}
          </div>
        )}
        {message?.shareItem && (
          <div
            style={message.shareItem && {cursor: 'pointer'}}
            className={`message-item__share-item`}
            onClick={showDetail}>
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
