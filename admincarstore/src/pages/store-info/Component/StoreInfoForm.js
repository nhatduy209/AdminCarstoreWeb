/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';

const StoreInfoForm = detail => {
  return (
    <div>
      <form className="booking-form-content">
        <div className="booking-form-content__title">Client Information</div>
        <div className="booking-form-content__group">
        <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Introduce</div>
            <div className="booking-form-content__field__input">
              {detail?.intro ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">CEO</div>
            <div className="booking-form-content__field__input">
              {detail?.CEO ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Like</div>
            <div className="booking-form-content__field__input">
              {detail?.like ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Phone</div>
            <div className="booking-form-content__field__input">
              {detail?.phone ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Address</div>
            <div className="booking-form-content__field__input">
              {detail?.address ?? '--'}
            </div>
          </div>
        </div>
      </form>
      <div className="group-btn">
        <button className="cancel-btn">
          <div>Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default StoreInfoForm;
