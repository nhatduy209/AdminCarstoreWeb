/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import HomeLayout from './home/HomeLayout';
import Login from './login/Login';
import {Routes, Route, useNavigate} from 'react-router-dom';
import CarManagement from './car-management/CarManagement';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {token_authen} from '../Config/Status/Key';
function App() {
  const navigate = useNavigate();
  const account = useSelector(state => state);
  const tokenID = 'token';
  useEffect(() => {
    const tokenID = localStorage.getItem(token_authen);
    console.log('HELLO ', tokenID);
    if (!tokenID) {
      navigate('/login');
    }
  }, [tokenID]);
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
