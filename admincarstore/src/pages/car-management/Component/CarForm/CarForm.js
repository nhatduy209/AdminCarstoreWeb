/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {FormControl, OutlinedInput, Icon} from '@mui/material';

const CarForm = selectedItem => {
  return (
    <div className='car-form'>
      <div className='car-form--left'>
        <div className='car-form__field'>
        <div className='car-form__field__label'>name</div>
        <OutlinedInput
          className="car-form__field__input"
          placeholder="Please enter Password"
          type="password"
        />
        </div>
      </div>
      <div className='car-form--right'>
      <div className='car-form__field'>
      <div className='car-form__field__label'>name</div>
        <OutlinedInput
          className="car-form__field__input"
          placeholder="Please enter Password"
          type="password"
        />
      </div>
      </div>
    </div>
  )
}

export default CarForm;
