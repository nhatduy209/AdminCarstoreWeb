/* eslint-disable react/react-in-jsx-scope */
import defaultAvatar from '../../assets/img/default-avatar.svg'
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';

const Message = () => {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  // const detail = useSelector(state => state.AccountReducer.account);
  return (
    <div className="message">
      hello
    </div>
  );
};

export default Message;
