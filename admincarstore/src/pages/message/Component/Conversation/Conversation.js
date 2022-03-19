/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {useState, useEffect} from 'react';
import Avatar from '../../../../component/Avatar/Avatar';

const Conversation = (conversation) => {
  
  return (
    <div className="conversation">
      {Avatar()}
      <div className="conversation__body">
        <div className="conversation__body__name">hello</div>
        <div className="conversation__body__last-message">teo buồn ngủ</div>
      </div>
      <div className="conversation__last-online">1 week</div>
    </div>
  );
};

export default Conversation;
