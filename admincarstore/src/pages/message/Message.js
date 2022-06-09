/* eslint-disable react/react-in-jsx-scope */
import defaultAvatar from '../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
import ListConversation from './Component/ListConversation/ListConversation';
import ConversationContent from './Component/ConversationContent/ConversationContent';
import socketIOClient from 'socket.io-client';
import {URL_MESSAGE} from '../../Config/Url/URL';
import {getListMessage} from '../../Redux/reducer/MessageReducer';
import {io} from 'socket.io-client';
const socket = io(URL_MESSAGE, {transports: ['websocket']});

const Message = () => {
  const dispatch = useDispatch();
  socket.emit('hello', {data: 'message from client'});
  const conversations = useSelector(state => state.MessageReducer.listConv);
  useEffect(() => {
    if(conversations.length > 0) {
      conversations.forEach(element => {
        socket.on(element.idSendingFromClient || '', dataFromServer => {
          console.log('DATA SEND FROM SERVER ------' + dataFromServer.data);
          dispatch(getListMessage());
        });
      });
    }
  }, [conversations]);
  return (
    <div className="message">
      {ListConversation()}
      {ConversationContent()}
    </div>
  );
};

export default Message;
