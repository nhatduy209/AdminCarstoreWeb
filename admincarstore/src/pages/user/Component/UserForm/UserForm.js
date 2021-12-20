/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {Icon} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CarDefault} from '../../../../model/car';

const UserForm = selectedItem => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState('');
  const [car, setCar] = useState(selectedItem ?? CarDefault);
  const listColor = useSelector(state => state.ColorReducer.listColor);
  const categories = useSelector(state => state.CategoryReducer.listCategory);

  const handleChange = event => {
    setCat(event.target.value);
    setCar({...car, category: event.target.value});
  };

  const changeData = (event, key) => {
    car[key] = event.target.value;
    setCar(car);
  };

  const handleListColor = () => {
    return listColor.map((el, index) => (
      <div
        key={index}
        style={{
          backgroundColor: el.color,
          width: 24,
          height: 24,
        }}></div>
    ));
  };

  return (
    <div className="car-form--container">
      <form className="car-form-content">
        <div className="car-form-content--left">
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Name</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter name"
              type="text"
              onChange={value => changeData(value, 'name')}
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Price</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter prices"
              onChange={value => changeData(value, 'prices')}
              type="number"
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Category</div>
            <Select
              className="car-form-content__field__input select-list"
              value={cat}
              onChange={handleChange}>
              {categories.map((el, index) => (
                <MenuItem key={index} value={el.name}>
                  {el?.name ?? '--'}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Height</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter height"
              onChange={value => changeData(value, 'height')}
              type="number"
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Width</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter width"
              onChange={value => changeData(value, 'width')}
              type="number"
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Length</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter length"
              onChange={value => changeData(value, 'length')}
              type="number"
            />
          </div>
        </div>
        <div className="car-form-content--right">
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Description</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter description"
              onChange={value => changeData(value, 'description')}
              type="text"
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label list-color__header">
              Color
              <Icon
                onClick={() => setOpen(true)}
                baseClassName="fas"
                className="fa-palette"
                sx={{fontSize: 18}}
              />
            </div>
            <div>{handleListColor()}</div>
            {/* <ColorForm></ColorForm> */}
          </div>
        </div>
      </form>
      <div className="group-btn">
        <button className="cancel-btn">
          <div>Cancel</div>
        </button>
        <button className="confirm-btn">
          <div>Confirm</div>
        </button>
      </div>
    </div>
  );
};

export default UserForm;
