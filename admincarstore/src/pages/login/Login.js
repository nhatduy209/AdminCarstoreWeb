/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {FormControl, OutlinedInput, Icon} from '@mui/material';

const Login = () => {
  return (
    <div className="login-container">
      <FormControl className="login-form">
        <div className="login-title">Login</div>
        <div className="login-form__title">Email</div>
        <OutlinedInput
          className="login-form__input"
          placeholder="Please enter Email"
        />
        <div className="login-form__title">Password</div>
        <OutlinedInput
          className="login-form__input"
          placeholder="Please enter Password"
        />
        <button className="login-form__button">
          <div>Login</div>
          <Icon baseClassName="fas" className="fa-circle-arrow-right" />
        </button>
      </FormControl>
    </div>
  );
};

export default Login;
