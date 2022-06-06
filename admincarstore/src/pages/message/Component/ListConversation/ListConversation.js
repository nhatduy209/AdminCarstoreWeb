/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Conversation from '../Conversation/Conversation';
import {getListMessage, setListMessage, setCurrentConv} from '../../../../Redux/reducer/MessageReducer';

const ListConversation = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.MessageReducer.listConv);
  const currentConv = useSelector(state => state.MessageReducer.currentConv);
  const getList = () => {
    dispatch(getListMessage());
  };
  useEffect(() => {
    getList();
    if(!currentConv && conversations?.length > 0) {
      dispatch(setCurrentConv(conversations[0]));
      dispatch(setListMessage(conversations[0].message));
    }
  }, [conversations.length]);
  return (
    <div className="conversation-list">
      <div
        style={{
          fontSize: '32px',
          padding: '12px',
          fontWeight: 700,
          textAlign: 'left',
        }}>
        Chat
      </div>
      <div className="conversation-list__items">
        {conversations?.map((user, index) => {
          return Conversation(user, index, () => {
            dispatch(setListMessage(user.message));
            dispatch(setCurrentConv(user));
          });
        })}
      </div>
    </div>
  );
};

export default ListConversation;
