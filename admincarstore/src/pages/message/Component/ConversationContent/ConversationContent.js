/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import MessageItem from '../MessageItem/MessageItem';

const ConversationContent = () => {
  
  return (
    <div className="conversation-content">
      <div className="conversation-content__header">
        {Avatar()}
        <div>name</div>
      </div>
      <div className="conversation-content__body">
        {MessageItem('left')}
        {MessageItem('right')}
      </div>
      <div className="conversation-content__footer">
        <input className="message-input"/>
        <div className="send-button">
          <div className="icon icon__send"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationContent;
