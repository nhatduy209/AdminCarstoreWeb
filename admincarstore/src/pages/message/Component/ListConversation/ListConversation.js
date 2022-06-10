/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Conversation from '../Conversation/Conversation';
import {getListMessage, setListMessage, setCurrentConv, setLoading} from '../../../../Redux/reducer/MessageReducer';
import LoadingSpinner from '../../../../component/spinner/Spinner';
import { STATUS } from '../../../../Config/Status/Index';

const ListConversation = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const conversations = useSelector(state => state.MessageReducer.listConv);
  const currentConv = useSelector(state => state.MessageReducer.currentConv);
  const loading = useSelector(state => state.MessageReducer.loading);
  const getList = () => {
    dispatch(getListMessage());
  };
  const getId = () => {
    const id = currentConv?.payload?.id?.split('_')[0] || "--";
    return id;
  }
  const getCurrentConv = (id) => {
    for (const key in conversations) {
      if (Object.hasOwnProperty.call(conversations, key)) {
        const element = conversations[key];
        if(element?.id?.includes(id)) {
          return element;
        }
      }
    }
    return null;
  }
  useEffect(() => {
    dispatch(setLoading(true));
    getList();
    if(!currentConv && conversations?.length > 0) {
      dispatch(setCurrentConv(conversations[0]));
      dispatch(setListMessage(conversations[0].message));
    }
  }, [conversations?.length]);

  useEffect(() => {
    if(currentConv && conversations?.length > 0) {
      const curConv = getCurrentConv(getId());
      dispatch(setListMessage(curConv?.message || []));
    }
  }, [conversations]);
  return (
    <div className="conversation-list">
      <div
        style={{
          fontSize: '32px',
          padding: '12px',
          marginBlock: '12px',
          fontWeight: 700,
          textAlign: 'left',
        }}>
        Messages
      </div>
      <input className="search-input" onChange={(value) => setInputText(value.target.value)} value={inputText} placeholder="Search..."/>
      <div className="conversation-list__items">
        {conversations?.map((user, index) => {
          return Conversation(user, index, () => {
            dispatch(setListMessage(user.message));
            dispatch(setCurrentConv(user));
          });
        })}
      </div>
      {loading && LoadingSpinner()}
    </div>
  );
};

export default ListConversation;
