/* eslint-disable react/react-in-jsx-scope */
import {useDispatch} from 'react-redux';
import './style.scss';
import ListConversation from './Component/ListConversation/ListConversation';
import ConversationContent from './Component/ConversationContent/ConversationContent';
import {URL_MESSAGE} from '../../Config/Url/URL';
import {io} from 'socket.io-client';
const socket = io(URL_MESSAGE, {transports: ['websocket']});

const Message = () => {
  const dispatch = useDispatch();
  return (
    <div className="message">
      {ListConversation()}
      {ConversationContent()}
    </div>
  );
};

export default Message;
