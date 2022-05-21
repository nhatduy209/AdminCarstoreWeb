/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect, useCallback} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import MessageItem from '../MessageItem/MessageItem';
import {io} from 'socket.io-client';
import {URL_MESSAGE} from '../../../../Config/Url/URL';
import {generatorCode} from '../../../../common/Utils';
const socket = io(
  'https://03b1-2001-ee0-4fc5-b200-656c-aa37-f8b3-f71a.ngrok.io',
  {
    transports: ['websocket'],
  },
);

const idNoticeChangedReciver = `${generatorCode(10)}_reciver`;
const idNoticeChangedSender = `${generatorCode(10)}_sender'`;

const ConversationContent = () => {
  const sendMessage = useCallback(() => {
    console.log('HELLO');
    socket.emit('code_from_admin', {data: 'Hêlu Duy'});
  });

  socket.on('code_from_client_sending', dataFromServer => {
    console.log('DATA SEND FROM SERVER ------' + dataFromServer.data);
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
