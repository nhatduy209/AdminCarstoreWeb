/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect, useRef} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import MessageItem from '../MessageItem/MessageItem';
import {io} from 'socket.io-client';
import {generatorCode} from '../../../../common/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  sendMessage,
  getListMessage,
} from '../../../../Redux/reducer/MessageReducer';
import {getCar} from '../../../../Redux/reducer/CarReducer';
import {getCategory} from '../../../../Redux/reducer/CategoryReducer';
import {toNumber} from '../../../../helps/formatter';
import CarForm from '../../../car-management/Component/CarForm/CarForm';
const socket = io('https://371f-42-115-124-132.ngrok.io/', {
  transports: ['websocket'],
});
const adminId = 'admin_123';

const idNoticeChangedReciver = `${generatorCode(10)}_reciver`;
const idNoticeChangedSender = `${generatorCode(10)}_sender'`;

const ConversationContent = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const cars = useSelector(state => state.CarReducer.listCar);
  const categories = useSelector(state => state.CategoryReducer.listCategory);
  const messages = useSelector(state => state.MessageReducer.listMessages);
  const currentConv = useSelector(state => state.MessageReducer.currentConv);
  const listMessageBottomRef = useRef();
  const send = async () => {
    const data = {
      reciver: getMail(),
      content: inputText,
      sender: 'admin_123',
    };
    await dispatch(sendMessage(data));
    socket.emit('code_from_admin', {
      data: inputText,
      id: currentConv.payload?.idSendingFromAdmin || '',
    });
    setInputText('');
    await dispatch(getListMessage());
  };

  socket.on('code_from_client_sending', dataFromServer => {
    console.log('DATA SEND FROM SERVER ------' + dataFromServer.data);
  });

  useEffect(() => {
    listMessageBottomRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages, currentConv]);
  useEffect(() => {
    dispatch(
      getCar({
        start: 0,
        end: 150,
      }),
    );
  }, [cars.length]);

  useEffect(() => {
    dispatch(getCategory());
  }, [categories.length]);

  const getMail = mess => {
    if (mess) {
      return mess?.id?.split('_')[1] || '--';
    }
    return currentConv?.payload?.id?.split('_')[0] || '--';
  };

  const getType = mess => {
    return mess?.id?.includes(adminId) || mess?.id?.includes('admin123')
      ? 'right'
      : 'left';
  };

  const setInput = val => {
    setInputText(val.target.value);
  };

  const showUser = index => {
    return (
      index - 1 < 0 ||
      getMail(messages?.payload[index]) !==
        getMail(messages?.payload[index - 1])
    );
  };

  const showTime = index => {
    const cur = toNumber(messages?.payload[index]?.time);
    const bef = toNumber(messages?.payload[index - 1]?.time);
    return index - 1 < 0 || (cur - bef) / 3600 > 360;
  };

  const today = index => {
    const cur = new Date(messages?.payload[index]?.time).getDate();
    const bef = new Date(messages?.payload[index - 1]?.time).getDate();
    return (isNaN(bef) || cur - bef > 0) && cur === new Date().getDate();
  };

  const showDetail = mess => {
    if (mess.shareItem) {
      const item = cars.filter(e => {
        return e.name.includes(mess.shareItem.name);
      });
      if (item.length > 0) {
        setSelectedItem(item[0]);
        setOpen(true);
      }
    }
  };

  return (
    <div className="conversation-content">
      <div className="conversation-content__header">
        {Avatar()}
        <div>{getMail()}</div>
      </div>
      <div className="conversation-content__body">
        {messages?.payload?.map((message, index) => {
          return (
            <div
              key={index}
              style={
                message.shareItem ? {display: 'flex', justifyContent: 'end'} : {}
              }>
              <div onClick={() => showDetail(message)}>
                {MessageItem(
                  getType(message),
                  message,
                  showUser(index),
                  showTime(index),
                  today(index),
                )}
              </div>
            </div>
          );
        })}
        <div ref={listMessageBottomRef} className="list-bottom"></div>
      </div>
      <div className="conversation-content__footer">
        <input
          className="message-input"
          onChange={value => setInput(value)}
          value={inputText}
          placeholder="Type something..."
        />
        {' | '}
        <div className="send-button" onClick={() => send()}>
          <div className="icon icon__send"></div>
        </div>
      </div>
      {CarForm(selectedItem, 'detail', setOpen, open)}
    </div>
  );
};

export default ConversationContent;
