/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {STATUS} from '../../../Config/Status/Index';
import {ToastContainer, toast} from 'react-toastify';
import {
  changeEditStatus,
  editStoreInfo,
  getStoreInfo,
} from '../../../Redux/reducer/StoreInfoReducer';
import './style.scss';

const StoreInfoForm = (detail, setOpen) => {
  const dispatch = useDispatch();
  const [storeDetail, setStoreDetail] = useState(detail);
  const editStatus = useSelector(
    state => state.StoreInfoReducer?.editStatus ?? false,
  );
  useEffect(() => {
    if (editStatus === STATUS.SUCCESS) {
      dispatch(changeEditStatus());
      setOpen(false);
    }
  }, [editStatus]);

  useEffect(() => {
    setStoreDetail(detail);
  }, [detail]);

  const handleEdit = () => {
    dispatch(editStoreInfo(storeDetail));
  };
  return (
    <div>
      <form className="form-content">
        <div className="form-content__group">
          <div className="form-content__field">
            <div className="form-content__field__label">Introduce</div>
            <input
              type="text"
              value={storeDetail?.intro}
              onChange={value =>
                setStoreDetail({...storeDetail, intro: value.target.value})
              }
              className="form-content__field__input"></input>
          </div>
          <div className="form-content__field">
            <div className="form-content__field__label">CEO</div>
            <input
              type="text"
              value={storeDetail?.CEO}
              onChange={value =>
                setStoreDetail({...storeDetail, CEO: value.target.value})
              }
              className="form-content__field__input"></input>
          </div>
          <div className="form-content__field">
            <div className="form-content__field__label">Like</div>
            <input
              type="text"
              value={detail?.like}
              disabled
              className="form-content__field__input"></input>
          </div>
          <div className="form-content__field">
            <div className="form-content__field__label">Phone</div>
            <input
              type="text"
              value={storeDetail?.phone}
              onChange={value =>
                setStoreDetail({...storeDetail, phone: value.target.value})
              }
              className="form-content__field__input"></input>
          </div>
          <div className="form-content__field">
            <div className="form-content__field__label">Address</div>
            <input
              type="text"
              value={storeDetail?.address}
              onChange={value =>
                setStoreDetail({...storeDetail, address: value.target.value})
              }
              className="form-content__field__input"></input>
          </div>
        </div>
      </form>
      <div className="form-group-btn">
        <button className="cancel-btn">
          <div onClick={() => setOpen(false)}>Cancel</div>
        </button>
        <button className="confirm-btn">
          <div onClick={() => handleEdit()}>Edit</div>
        </button>
      </div>
    </div>
  );
};

export default StoreInfoForm;
