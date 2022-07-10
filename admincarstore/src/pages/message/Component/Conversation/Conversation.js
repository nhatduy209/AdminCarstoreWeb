/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {formatTimeDuration} from '../../../../helps/formatter';
import { ImageTemplate } from '../MessageItem/MessageItem';

const Conversation = (data, key, onClick) => {
  const dispatch = useDispatch();
  const getLatestMessage = () => {
    return data?.message.length > 0
      ? data?.message[data?.message?.length - 1]
      : {};
  };
  const getLatestMessageContent = () => {
    const lastMess = getLatestMessage();
    if(lastMess?.shareItem) {
      return `Send a product link`;
    }
    if(lastMess?.content?.includes(ImageTemplate)) {
      return `Send a image`;
    }
    return lastMess ? lastMess.content : '...';
  };
  const getLatestMessageTime = () => {
    return getLatestMessage()
      ? formatTimeDuration(new Date(getLatestMessage().time))
      : '...';
  };
  const getMail = () => {
    const ids = data?.id?.split('_');
    return ids[0];
  };
  return (
    <div className="conversation" onClick={() => onClick()} key={key}>
      {Avatar()}
      <div className="conversation__body">
        <div className="conversation__body__name">{getMail()}</div>
        <div className="conversation__body__last-message">
          <div className="conversation__body__last-message__content ellipsis">
            {getLatestMessageContent()}
          </div>
          <div className="conversation__last-online">{`* ${getLatestMessageTime()}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
