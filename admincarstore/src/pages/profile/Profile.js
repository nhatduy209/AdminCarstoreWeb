/* eslint-disable react/react-in-jsx-scope */
import defaultAvatar from '../../assets/img/default-avatar.svg'
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
import {ToastContainer} from 'react-toastify';
import ProfileForm from './Component/ProfileForm/ProfileForm';
import moment from 'moment';

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const detail = useSelector(state => state.AccountReducer.account);
  return (
    <div className="store-info">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="store-info__container">
        <div className="booking-form-content__title">My Information</div>
        <img
          className="booking-form-content__img"
          src={detail?.image?.length < 1 ? defaultAvatar : detail?.image}
          style={{height: 260}}
        />
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Name</div>
            <div className="booking-form-content__field__input">
              {detail?.name ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Email</div>
            <div className="booking-form-content__field__input">
              {detail?.email ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Birthday</div>
            <div className="booking-form-content__field__input">
              {detail?.birthday ? moment(detail?.birthday).format('DD/MM/yyyy') : '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Address</div>
            <div className="booking-form-content__field__input">
              {detail?.address ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Gender</div>
            <div className="booking-form-content__field__input">
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
      {ProfileForm(detail, setOpen, open)}
    </div>
  );
};

export default Profile;
