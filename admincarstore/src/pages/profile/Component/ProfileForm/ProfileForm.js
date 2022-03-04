/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';
import {Icon} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeAccountStatus,
  changeProfile,
  updateProfile,
} from '../../../../Redux/reducer/AccountReducer';
import moment from 'moment';
import {validate} from '../../../../helps/validattion';

const ProfileForm = (setOpen, open) => {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.AccountReducer.account);
  const [detail, setDetail] = useState(currentAccount);
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(
    detail?.image?.length < 1 ? defaultAvatar : detail?.image,
  );

  useEffect(() => {

    if(!detail) {
      return;
    }

    setDetail(currentAccount);
    setUrl(currentAccount.image)
  }, [currentAccount]);

  const changeData = (event, key) => {
    setDetail({...detail, [key]: event.target.value});
  };

  const handleConfirm = () => {
    if (validate(detail).length > 0) {
      return;
    }
    const item = {
      ...detail,
      img,
      url,
    };

    dispatch(changeProfile(item));
  };

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
      className="form profile-form"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <div className="form--main">
        <div className="form--container">
          <div className="form__header">
            <div>Change my profile</div>
            <Icon
              onClick={() => setOpen(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          <form className="profile-form-content form-content">
            <div style={{display: 'grid', justifyContent: 'center'}}>
              <img
                className="booking-form-content__img"
                src={url}
                style={{height: 260, borderRadius: '50%'}}
              />
              <div className="profile-form__img-picker">
                Pick image
                <input
                  required
                  onChange={upload}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="image-picker-btn"
                />
              </div>
            </div>
            <div className="profile-form-content--left">
              <div className="form-content__field">
                <div className="form-content__field__label">Email</div>
                <input value={detail?.email ?? ''} disabled={true} className="form-content__field__input"/>
              </div>
              <div className="form-content__field">
                <div className="form-content__field__label">Name</div>
                <input
                  className="form-content__field__input"
                  placeholder="Please enter prices"
                  onChange={value => changeData(value, 'name')}
                  value={detail?.name ?? ''}
                  type="text"
                />
              </div>
              <div className="form-content__field">
                <div className="form-content__field__label">Gender</div>
                <select
                  className="form-content__field__input select-list"
                  value={detail?.gender ?? true}
                  onChange={value => changeData(value, 'gender')}>
                  <option value={true}>Male</option>
                  <option value={false}>Female</option>
                </select>
              </div>
              <div className="form-content__field">
                <div className="form-content__field__label">BOD</div>
                <input
                  className="form-content__field__input"
                  placeholder="Please enter width"
                  onChange={value => changeData(value, 'birthday')}
                  type="text"
                  value={
                    detail?.birthday
                      ? moment(detail?.birthday).format('DD/MM/yyyy')
                      : ''
                  }
                />
              </div>
              <div className="form-content__field">
                <div className="form-content__field__label">Address</div>
                <input
                  className="form-content__field__input"
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
              <div onClick={() => handleConfirm()}>Confirm</div>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileForm;
