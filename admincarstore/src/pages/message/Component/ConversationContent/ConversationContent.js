/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect, useCallback, createRef, useRef} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import MessageItem from '../MessageItem/MessageItem';
import {io} from 'socket.io-client';
import {URL_MESSAGE} from '../../../../Config/Url/URL';
import {generatorCode} from '../../../../common/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage, getListMessage} from '../../../../Redux/reducer/MessageReducer';
import moment from 'moment';
import { toNumber } from '../../../../helps/formatter';
const socket = io(
  'https://96c2-2402-800-631d-2376-e95b-79c3-2cd6-874.ngrok.io/',
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
  const currentConv = useSelector(state => state.MessageReducer.currentConv);
  const listMessageBottomRef = useRef();
  const send = async () => {
    const data = {
      reciver: getMail(),
      content: inputText,
      sender: "admin_123",
    };
    await dispatch(sendMessage(data));
    socket.emit('code_from_admin', {data: inputText, id: currentConv.payload?.idSendingFromAdmin || ''});
    setInputText("");
    await dispatch(getListMessage());
  };

  socket.on('code_from_client_sending', dataFromServer => {
    console.log('DATA SEND FROM SERVER ------' + dataFromServer.data);
  });

  useEffect(() => {
    listMessageBottomRef.current.scrollIntoView(
      { 
        behavior: "smooth" ,
        block: 'start'
      }
    );
  }, [messages, currentConv])

  const getMail = (mess) => {
    if(mess) {
      return mess?.id?.split('_')[1] || "--";
    }
    return currentConv?.payload?.id?.split('_')[0] || "--";
  }

  const getType = (mess) => {
    return mess?.id?.includes(adminId) || mess?.id?.includes('admin123') ? "right" : "left";
  }

  const setInput = val => {
    setInputText(val.target.value);
  };

  const showUser = (index) => {
    return index - 1 < 0 || getMail(messages?.payload[index]) !== getMail(messages?.payload[index - 1])
  }

  const showTime = (index) => {
    const cur = toNumber(messages?.payload[index]?.time);
    const bef = toNumber(messages?.payload[index - 1]?.time);
    return index - 1 < 0 || (cur - bef)/(3600) > 360
  }

  const today = (index) => {
    const cur = new Date(messages?.payload[index]?.time).getDate();
    const bef = new Date(messages?.payload[index - 1]?.time).getDate();
    return (isNaN(bef) || cur - bef > 0) && cur === new Date().getDate();
  }

  return (
    <div className="conversation-content">
      <div className="conversation-content__header">
        {Avatar()}
        <div>{getMail()}</div>
      </div>
      <div className="conversation-content__body">
        {messages?.payload?.map((message, index) => {
          return (<div style={{'cursor': 'pointer'}} key={index} onClick={() => console.log(message)}>
            {MessageItem(getType(message), message, showUser(index), showTime(index), today(index))}
          </div>)
        })}
        <div ref={listMessageBottomRef} className="list-bottom"></div>
      </div>
      <div className="conversation-content__footer">
        <input className="message-input" onChange={(value) => setInput(value)} value={inputText} placeholder="Type something..."/>{" | "}
        <div className="send-button" onClick={() => send()}>
          <div className="icon icon__send"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationContent;
