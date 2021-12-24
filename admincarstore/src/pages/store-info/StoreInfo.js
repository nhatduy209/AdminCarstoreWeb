/* eslint-disable react/react-in-jsx-scope */
import carImage from '../../assets/img/car-store.png';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
import {getStoreInfo} from '../../Redux/reducer/StoreInfoReducer';
import Dialog from '@mui/material/Dialog';
import StoreInfoForm from './Component/StoreInfoForm';
import {Icon} from '@mui/material';
const backgroundImage = 'https://i.pinimg.com/736x/fa/c1/61/fac161945071d816084a3d18a61551c2.jpg'

const StoreInfo = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const status = useSelector(state => state.StoreInfoReducer.status);
  const detail = useSelector(state => state.StoreInfoReducer.storeInfo);
  useEffect(() => {
    dispatch(getStoreInfo());
  }, [status]);
  return (
    <div className="store-info">
      <div className="store-info-box">
      <img
        className="store-info__img"
        alt="Remy Sharp"
        src={backgroundImage}
        style={{height: '100%', borderRadius: '20px 0 0 20px'}}
      />
      <div className="store-info__container">
        <div style={{fontSize: 36, fontWeight: 'bold', marginBottom: 20}}>Store Information</div>
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
          <div className="booking-form-content__field end-field">
            <div className="booking-form-content__field__label">Address</div>
            <div className="booking-form-content__field__input">
              {detail?.address ?? '--'}
            </div>
          </div>
        </div>
        <div className="group-btn">
          <button className="confirm-btn">
            <div onClick={() => setOpen(true)}>edit</div>
          </button>
        </div>
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
