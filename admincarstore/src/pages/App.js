/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import '../assets/css/icon.scss';
import '../assets/css/typhography.scss'
import HomeLayout from './home/HomeLayout';
import Login from './login/Login';
import {Routes, Route, useNavigate} from 'react-router-dom';
import CarManagement from './car-management/CarManagement';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {token_authen} from '../Config/Status/Key';
import { getCurrentUser, login } from '../Redux/reducer/AccountReducer';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = useSelector(getCurrentUser);
  const isLoggin = useSelector(state => state.AccountReducer.account.isLoggin)
  const tokenID = 'token';
  useEffect(() => {
    const tokenID = localStorage.getItem(token_authen);
    const email = localStorage.email;
    const password = localStorage.password;
    if (!tokenID) {
      navigate('/login');
    }
    if (tokenID && getUser.isLoggin === 'NONE') {
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
