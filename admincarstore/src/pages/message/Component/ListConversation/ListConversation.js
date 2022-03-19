/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Conversation from '../Conversation/Conversation';

const ListConversation = () => {
  const dispatch = useDispatch();
  return (
    <div className="conversation-list">
      <div style={{fontSize: '32px', padding: '12px', fontWeight: 700, textAlign:'left'}}>Chat</div>
      {Conversation()}
      {Conversation()}
    </div>
  );
};

export default ListConversation;
