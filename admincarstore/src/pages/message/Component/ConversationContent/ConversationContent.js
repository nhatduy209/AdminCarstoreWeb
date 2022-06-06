/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect, useCallback} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import MessageItem from '../MessageItem/MessageItem';
import {io} from 'socket.io-client';
import {URL_MESSAGE} from '../../../../Config/Url/URL';
import {generatorCode} from '../../../../common/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, getListMessage, setLoading} from '../../../../Redux/reducer/MessageReducer';
const socket = io(
  'https://6695-115-76-154-91.ngrok.io/',
  {
    transports: ['websocket'],
  },
);
const adminId = "admin_123"

const idNoticeChangedReciver = `${generatorCode(10)}_reciver`;
const idNoticeChangedSender = `${generatorCode(10)}_sender'`;

const ConversationContent = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const messages = useSelector(state => state.MessageReducer.listMessages);
  const currnentConv = useSelector(state => state.MessageReducer.currnentConv);
  const send = () => {
    const data = {
      reciver: getMail(),
      content: inputText,
      sender: "admin_123",
    };
    dispatch(sendMessage(data));
    socket.emit('code_from_admin', {data: inputText, id: currnentConv.idSendingFromAdmin});
    setInputText("");
  };

  socket.on('code_from_client_sending', dataFromServer => {
    console.log('DATA SEND FROM SERVER ------' + dataFromServer.data);
  });

  const getMail = () => {
    const id = currnentConv?.payload?.id?.split('_')[0] || "--";
    return id;
  }

  const getType = (mess) => {
    return mess?.id?.includes(adminId) ? "right" : "left";
  }

  const setInput = val => {
    setInputText(val.target.value);
  };

  return (
    <div className="conversation-content">
      <div className="conversation-content__header">
        {Avatar()}
        <div>{getMail()}</div>
      </div>
      <div className="conversation-content__body">
        {messages?.payload?.map((message, index) => {
          return (<div key={index}>
            {message?.content && MessageItem(getType(message), message.content)}
          </div>)
        })}
      </div>
      <div className="conversation-content__footer">
        <input className="message-input" onChange={(value) => setInput(value)} value={inputText}/>
        <div className="send-button" onClick={() => send()}>
          <div className="icon icon__send"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationContent;
