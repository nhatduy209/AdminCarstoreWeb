/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {Icon} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addColor} from '../../../../Redux/reducer/ColorReducer';
import {validate} from '../../../../helps/validattion';
import {toast} from 'react-toastify';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
const defaultImage =
  'http://autopro8.mediacdn.vn/2016/dscf0015-1476658861227.jpg';
const SWATCHES_STYLES = {
  marginTop: 4,
  display: 'flex',
  justifyContent: 'center',
};

const ColorForm = (setColorOpen, colorOpen) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(defaultImage);
  const [numberInStore, setNumberInStore] = useState(0);
  const [color, setColor] = useColor("hex", "#121212");

  useEffect(() => {
    if (!colorOpen) {
      setUrl(defaultImage);
      setImg(null);
      setNumberInStore(0);
    }
  }, [colorOpen]);

  const addCurentColor = () => {
    if (numberInStore === '') {
      setNumberInStore(0);
      return;
    }
    const item = {
      color: color.hex,
      img,
      url,
      numberInStore,
    };
    if (validate(item).length > 0) {
      toast.error(`Please fill in all`);
      return;
    }
    dispatch(addColor(item));
    setColorOpen(false);
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
    <Dialog open={colorOpen} className="car-form color-form">
      <div className="car-form--main">
        <div className="car-form__header">
          <div>Add car color</div>
          <Icon
            onClick={() => setColorOpen(false)}
            baseClassName="fas"
            className="fa-xmark"
            sx={{fontSize: 24}}
          />
        </div>
        <div className="car-form--container">
          <Avatar
            className="color-form-content__img"
            alt="Remy Sharp"
            src={url}
            sx={{width: 160, height: 160}}
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
          <ColorPicker width={456} height={228} 
                   color={color} 
                   onChange={setColor} hideHSV dark />
          <div className="color-form-content">
            <div className="car-form-content__field review-color">
              <div className="car-form-content__field__label">Color</div>
              <div
                style={{backgroundColor: color.hex}}
                className="selected-color"></div>
            </div>

            <div className="car-form-content__field">
              <div className="car-form-content__field__label">Quantity</div>
              <input
                required
                className="car-form-content__field__input"
                placeholder="Please enter car's quantity"
                value={numberInStore}
                onChange={value => setNumberInStore(value.target.value)}
                type="number"
              />
            </div>
          </div>
          <div className="form-group-btn">
              <button className="cancel-btn">
                <div onClick={() => setColorOpen(false)}>Cancel</div>
              </button>
              <button className="confirm-btn">
                <div onClick={() => addCurentColor()}>Confirm</div>
              </button>
            </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ColorForm;
