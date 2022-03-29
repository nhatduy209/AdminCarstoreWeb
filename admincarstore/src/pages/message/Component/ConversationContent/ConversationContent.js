/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect, useCallback} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import MessageItem from '../MessageItem/MessageItem';
import {io} from 'socket.io-client';
import {URL_MESSAGE} from '../../../../Config/Url/URL';
import {generatorCode} from '../../../../common/Utils';
const socket = io(URL_MESSAGE, {transports: ['websocket']});

const idNoticeChangedReciver = `${generatorCode(10)}_reciver`;
const idNoticeChangedSender = `${generatorCode(10)}_sender'`;

const ConversationContent = () => {
  const sendMessage = useCallback(() => {
    console.log('HELLO');
    socket.emit(idNoticeChangedSender, {data: 'message from client'});
  });
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
        <input className="message-input" />
        <div className="send-button" onClick={() => sendMessage()}>
          <div className="icon icon__send"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationContent;
