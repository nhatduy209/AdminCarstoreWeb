/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import {Icon} from '@mui/material';
import {useEffect, useState, useCallback} from 'react';
import {getCurrentUser, login, setLoginState} from '../../Redux/reducer/AccountReducer';
import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {STATUS} from '../../Config/Status/Index';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const getUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getUser.isLoggin === STATUS.SUCCESS) {
      toast.success('Success Loggin !', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => navigate('/'), 3000);
    } else if (getUser.isLoggin === STATUS.FAIL) {
      toast.error('Invalid password or email ', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
      });
      dispatch(setLoginState(STATUS.NONE));
    }
  }, [getUser.isLoggin]);

  const handleLogin = useCallback((email, password) => {
    dispatch(login({email, password}));
  }, []);

  return (
    <div className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      {/* //  <form className="login-form"> */}
      <div className="login-form">
        <div className="login-title">Login</div>
        <div className="login-form__title">Email</div>
        <input
          className="login-form__input"
          placeholder="Please enter Email"
          onChange={value => setEmail(value.target.value)}
        />
        <div className="login-form__title">Password</div>
        <input
          className="login-form__input"
          placeholder="Please enter Password"
          onChange={value => setPassword(value.target.value)}
          type="password"
        />
        <button
          className="login-form__button"
          onClick={() => handleLogin(email, password)}>
          <div>Login</div>
          <Icon baseClassName="fas" className="fa-circle-arrow-right" />
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;
