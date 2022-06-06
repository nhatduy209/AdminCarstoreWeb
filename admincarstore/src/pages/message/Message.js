/* eslint-disable react/react-in-jsx-scope */
import defaultAvatar from '../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
import ListConversation from './Component/ListConversation/ListConversation';
import ConversationContent from './Component/ConversationContent/ConversationContent';
import socketIOClient from 'socket.io-client';
import {URL_MESSAGE} from '../../Config/Url/URL';
import {io} from 'socket.io-client';
const socket = io(URL_MESSAGE, {transports: ['websocket']});

const Message = () => {
  const dispatch = useDispatch();
  socket.emit('hello', {data: 'message from client'});
  return (
    <div className="message">
      {ListConversation()}
      {ConversationContent()}
    </div>
  );
};

export default Message;
