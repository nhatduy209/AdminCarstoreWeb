/* eslint-disable react/react-in-jsx-scope */
import defaultAvatar from '../../assets/img/default-avatar.svg'
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
import {ToastContainer} from 'react-toastify';
import {Icon} from '@mui/material';
import ProfileForm from './Component/ProfileForm/ProfileForm';
import moment from 'moment';

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const detail = useSelector(state => state.AccountReducer.account);
  return (
    <div className="profile">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <div className="profile-container">
        {/* <div className="profile__title">My Information</div> */}
        <img
          className="profile__img"
          src={detail?.image?.length < 1 ? defaultAvatar : detail?.image}
        />
        <div className="profile-content__group">
          <div className="profile-content__field">
            <div className="icon icon__user profile-content__field__label"></div>
            <div className="profile-content__field__input">
              {detail?.name ?? '--'}
            </div>
          </div>
          <div className="profile-content__field">
            <div className="icon icon__mail profile-content__field__label"></div>
            <div className="profile-content__field__input">
              {detail?.email ?? '--'}
            </div>
          </div>
          <div className="profile-content__field">
            <div className="icon icon__calendar profile-content__field__label"></div>
            <div className="profile-content__field__input">
              {detail?.birthday ? moment(detail?.birthday).format('DD/MM/yyyy') : '--'}
            </div>
          </div>
          <div className="profile-content__field">
            <div className="icon icon__location profile-content__field__label"></div>
            <div className="profile-content__field__input">
              {detail?.address ?? '--'}
            </div>
          </div>
          <div className="profile-content__field">
            <div className="icon icon__gender profile-content__field__label"></div>
            <div className="profile-content__field__input">
              {detail?.gender ? 'male' : 'female'}
            </div>
          </div>
        </div>
        <div className="group-btn">
          <button className="confirm-btn">
            <div onClick={() => setOpen(true)}>edit</div>
          </button>
        </div>
      </div>
      {ProfileForm(setOpen, open)}
    </div>
  );
};

export default Profile;
