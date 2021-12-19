/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {Icon} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {ColorExtractor} from 'react-color-extractor';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addColor } from '../../../../Redux/reducer/ColorReducer';
import { validate } from '../../../../helps/validattion';
const defaultImage =
  'http://autopro8.mediacdn.vn/2016/dscf0015-1476658861227.jpg';
const SWATCHES_STYLES = {
  marginTop: 4,
  display: 'flex',
  justifyContent: 'center',
};

const ColorForm = (setOpen, open) => {
  const dispatch = useDispatch();
  const [colors, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(defaultImage);
  const [numberInStore, setNumberInStore] = useState(0);
  const listColor = useSelector(state => state.ColorReducer.listColor)

  useEffect(() => {
    if(!open) {
      setSelectedColor(null);
      setUrl(defaultImage);
      setImg(null);
      setNumberInStore(0)
    }
  }, [open])
  const renderSwatches = () => {
    return colors.map((color, id) => {
      return (
        <div
          onClick={() => setSelectedColor(color)}
          key={id}
          style={{
            backgroundColor: color,
            width: 24,
            height: 24,
          }}
        />
      );
    });
  };

  const addCurentColor = () => {
    if(numberInStore === '') {
      setNumberInStore(0);
      return;
    }
    const item = {
      color: selectedColor,
      img,
      url,
      numberInStore
    }
    if(validate(item).length > 0) {
      console.log('please fill in all', validate(item));
      return;
    }
    dispatch(addColor(item));
    setOpen(false);
  }

  const upload = (e) => {
    var reader,
      files = e.target.files;
    setImg(e.target.files[0].name);
    console.log(e.target.files[0]);
    if (files.length === 0) {
      console.log("empty");
    }
    reader = new FileReader();
    reader.onload = (e) => {
      setUrl(e.target?.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getColors = listColor => setColor([...listColor]);
  return (
    <div className="color-form--container">
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
      <ColorExtractor src={url} getColors={getColors} />
      <div style={SWATCHES_STYLES}>{renderSwatches()}</div>
      <div className="color-form-content">
        <div className="car-form-content__field review-color">
          <div className="car-form-content__field__label">Color</div>
          <div
            style={{backgroundColor: selectedColor}}
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

        <div className="group-btn">
          <button className="cancel-btn">
            <div onClick={() => setOpen(false)}>Cancel</div>
          </button>
          <button className="confirm-btn">
            <div onClick={() => addCurentColor()}>Confirm</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorForm;
