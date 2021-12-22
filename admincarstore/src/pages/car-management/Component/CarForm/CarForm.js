/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {Icon} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ColorForm from '../ColorForm/ColorForm';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {validate} from '../../../../helps/validattion';
import {addCar, changeCarStatus, editCar, getCar} from '../../../../Redux/reducer/CarReducer';
import {setColor} from '../../../../Redux/reducer/ColorReducer';

const CarForm = (selectedItem, formType, setOpen, open) => {
  const dispatch = useDispatch();
  const [colorOpen, setColorOpen] = useState(false);
  const [cat, setCat] = useState(selectedItem?.category ?? '');
  const [car, setCar] = useState(selectedItem);
  const carStatus = useSelector(state => state.CarReducer.status);
  let listColor = useSelector(state => state.ColorReducer.listColor);
  const categories = useSelector(state => state.CategoryReducer.listCategory);

  useEffect(() => {
    setCar(selectedItem);
    const color = selectedItem?.color ?? [];
    dispatch(setColor(color));
  }, [open]);

  useEffect(() => {
    if(carStatus) {
      dispatch(changeCarStatus());
      dispatch(getCar({start: 0, end: 30}));
      setOpen(false);
      return;
    }
  }, [carStatus]);

  const handleChange = event => {
    setCat(event.target.value);
    setCar({...car, category: event.target.value});
  };

  const changeData = (event, key) => {
    let carChange = {...car, [key]: event.target.value};
    setCar(carChange);
  };

  const handleFormType = () => {
    switch (formType) {
      case 'create':
        return 'Create';
      case 'edit':
        return 'Edit';
      case 'detail':
        return 'Detail';
      default:
        return '';
    }
  };

  const handleListColor = () => {
    console.log(listColor);
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

  const closePopup = () => {
    setCar(null);
    dispatch(setColor([]));
    setOpen(false);
  };

  const handleConfirm = () => {
    switch (formType) {
      case 'create':
        handleAddCar()
        break;
      case 'edit':
        handleEditCar();
        break;
      case 'detail':
        break;
      default:
        break;
    }
  }

  const handleEditCar = () => {
    car.listColor = listColor;
    if (validate(car).length > 0) {
      console.log('Please fill in all');
      return;
    }

    console.log(car)
    dispatch(editCar(car));
  };

  const handleAddCar = () => {
    car.listColor = listColor;
    if (validate(car).length > 0) {
      console.log('Please fill in all');
      return;
    }

    dispatch(addCar(car));
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
            <div>{handleFormType()}</div>
            <Icon
              onClick={() => closePopup()}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          <form className="car-form-content">
            <div className="car-form-content--left">
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Name</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter name"
                  type="text"
                  value={car?.name ?? ''}
                  disabled ={formType !== 'create'}
                  onChange={value => changeData(value, 'name')}
                />
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Price</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter prices"
                  onChange={value => changeData(value, 'prices')}
                  value={car?.prices ?? ''}
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
                  value={car?.height ?? ''}
                />
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Width</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter width"
                  onChange={value => changeData(value, 'width')}
                  type="number"
                  value={car?.width ?? ''}
                />
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">Length</div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter length"
                  onChange={value => changeData(value, 'length')}
                  type="number"
                  value={car?.length ?? ''}
                />
              </div>
            </div>
            <div className="car-form-content--right">
              <div className="car-form-content__field">
                <div className="car-form-content__field__label">
                  Description
                </div>
                <input
                  className="car-form-content__field__input"
                  placeholder="Please enter description"
                  onChange={value => changeData(value, 'description')}
                  type="text"
                  value={car?.description ?? ''}
                />
              </div>
              <div className="car-form-content__field">
                <div className="car-form-content__field__label list-color__header">
                  Color
                  <Icon
                    onClick={() => {
                      if(formType !== 'create') {
                        return;
                      }
                      setColorOpen(true)
                    }}
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
          <div className="form-group-btn">
            <button className="cancel-btn">
              <div onClick={() => closePopup()}>Cancel</div>
            </button>
            <button className="confirm-btn" style={formType === 'detail' ? {display: 'none'} : {}}>
              <div onClick={() => handleConfirm()}>{handleFormType()}</div>
            </button>
          </div>
        </div>
        {ColorForm(setColorOpen, colorOpen)}
      </div>
    </Dialog>
  );
};

export default CarForm;
