/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import '../assets/css/icon.scss';
import '../assets/css/typhography.scss';
import '../assets/css/form.scss';
import '../assets/css/table.scss';
import '../assets/css/colors.scss';
import HomeLayout from './home/HomeLayout';
import Login from './login/Login';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {token_authen} from '../Config/Status/Key';
import { login } from '../Redux/reducer/AccountReducer';
import { STATUS } from '../Config/Status/Index';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggin = useSelector(
    state => state.AccountReducer?.account?.isLoggin,
  );

  useEffect(() => {
    const tokenID = localStorage.getItem(token_authen);
    const email = localStorage.email;
    const password = localStorage.password;
    if ((isLoggin === STATUS.NONE || isLoggin === STATUS.FAIL) && !tokenID) {
      navigate('/login');
    } else if(email && password) {
      dispatch(login({email, password}));
    }
  }, [isLoggin]);

  return (
    <div className="App">
      <Routes>
        {/* <Route
          exact
          path="/"
          render={() => {
              return (
                <Navigate to="/login" />
              )
          }}
        /> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="*" element={<HomeLayout />} />
      </Routes>
    </div>
  );
}

export default App;
