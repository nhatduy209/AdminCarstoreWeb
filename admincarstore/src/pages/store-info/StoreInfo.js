/* eslint-disable react/react-in-jsx-scope */
import carImage from '../../assets/img/car-store.png';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
import {getStoreInfo} from '../../Redux/reducer/StoreInfoReducer';
import Dialog from '@mui/material/Dialog';
import StoreInfoForm from './Component/StoreInfoForm';
import {Icon} from '@mui/material';

const StoreInfo = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const status = useSelector(state => state.StoreInfoReducer.status);
  const detail = useSelector(state => state.StoreInfoReducer.storeInfo);
  useEffect(() => {
    dispatch(getStoreInfo());
  }, [status]);
  return (
    <div className="profile store-info">
      <div className="profile__container store-info__container">
          <div style={{fontSize: 36, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'}}>
            Store Information
          </div>
          <div className="store-info__group">
            <div className="profile-content__field">
              <div className="profile-content__field__label">
                Introduce
              </div>
              <div className="profile-content__field__input">
                {detail?.intro ?? '--'}
              </div>
            </div>
            <div className="profile-content__field">
              <div className="profile-content__field__label">CEO</div>
              <div className="profile-content__field__input">
                {detail?.CEO ?? '--'}
              </div>
            </div>
            <div className="profile-content__field">
              <div className="profile-content__field__label">Like</div>
              <div className="profile-content__field__input">
                {detail?.like ?? '--'}
              </div>
            </div>
            <div className="profile-content__field">
              <div className="profile-content__field__label">Phone</div>
              <div className="profile-content__field__input">
                {detail?.phone ?? '--'}
              </div>
            </div>
            <div className="profile-content__field end-field">
              <div className="profile-content__field__label">Address</div>
              <div className="profile-content__field__input">
                {detail?.address ?? '--'}
              </div>
            </div>
          </div>
          <div className="group-btn">
            <button className="confirm-btn">
              <div onClick={() => setOpen(true)}>Edit</div>
            </button>
          </div>
        </div>
      <Dialog
        open={open}
        className="car-form"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <div className="car-form--main">
          <div className="car-form__header">
            <div className="car-form__header__title">Title</div>
            <Icon
              onClick={() => setOpen(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          {StoreInfoForm(detail, setOpen)}
        </div>
      </Dialog>
    </div>
  );
};

export default StoreInfo;
