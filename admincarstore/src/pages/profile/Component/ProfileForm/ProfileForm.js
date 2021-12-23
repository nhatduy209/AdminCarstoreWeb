/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg'
import {Icon} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { changeAccountStatus, changeProfile, updateProfile } from '../../../../Redux/reducer/AccountReducer';
import moment from 'moment';
import { validate } from '../../../../helps/validattion';

const ProfileForm = (selectedItem, setOpen, open) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.AccountReducer.account);
  const currentStatus = useSelector(state => state.AccountReducer.status);
  const [detail, setDetail] = useState(currentAccount);
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(detail?.image?.length < 1 ? defaultAvatar : detail?.image);

  useEffect(() => {
    if(!currentStatus) {
      return;
    }

    dispatch(updateProfile(detail));
    dispatch(changeAccountStatus());
    setOpen(false);
  }, [currentStatus])

  const changeData = (event, key) => {
    setDetail({...detail, [key]: event.target.value});
  };

  const handleConfirm = () => {
    if (validate(detail).length > 0 ) {
      console.log('please fill in all', validate(detail));
      return;
    }
    const item = {
      ...detail,
      img,
      url
    };

    dispatch(changeProfile(item));
  }

  const upload = e => {
    var reader,
      files = e.target.files;
    setImg(e.target.files[0].name);
    if (files.length === 0) {
      console.log('empty');
    }
    reader = new FileReader();
    reader.onload = e => {
      setUrl(e.target?.result);
    };
    reader.readAsDataURL(files[0]);
  };
  return (
    <Dialog
      open={open}
      className="car-form"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <div className="car-form--main">
        <div className="car-form--container">
          <div className="car-form__header">
            <div>Change my profile</div>
            <Icon
              onClick={() => setOpen(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          <form className="car-form-content">
          <img
          className="booking-form-content__img"
          src={url}
          style={{height: 260}}
        />
        <div className="color-form-content__img-picker">
            Pick image
            <input
              required
              onChange={upload}
              type="file"
              accept=".png, .jpg, .jpeg"
              className="image-picker-btn"
            />
          </div>
            <div className="car-form-content--left">
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Email</div>
                <div
                  className="car-form-content__field__input"
                >{detail?.email ?? ''}</div>
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Name</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter prices"
                  onChange={value => changeData(value, 'name')}
                  value={detail?.name ?? ''}
                  type="text"
                />
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Gender</div>
                <Select
                  className="car-form-content__field__input select-list"
                  value={detail?.gender ?? true}
                  onChange={value => changeData(value, 'gender')}>
                  <MenuItem value={true}>
                      Male
                    </MenuItem>
                    <MenuItem value={false}>
                      Female
                    </MenuItem>
                </Select>
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">BOD</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter width"
                  onChange={value => changeData(value, 'birthday')}
                  type="text"
                  value={detail?.birthday ? moment(detail?.birthday).format('DD/MM/yyyy') : ''}
                />
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Address</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter height"
                  onChange={value => changeData(value, 'address')}
                  type="text"
                  value={detail?.address ?? ''}
                />
              </div>
            </div>
            
          </form>
          <div className="form-group-btn">
            <button className="cancel-btn">
              <div onClick={() => setOpen(false)}>Cancel</div>
            </button>
            <button className="confirm-btn">
              <div onClick={() => handleConfirm()}>Edit</div>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileForm;
