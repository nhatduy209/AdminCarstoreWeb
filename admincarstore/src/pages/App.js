/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import HomeLayout from './home/HomeLayout';
import Login from './login/Login';
import {Routes, Route, useNavigate} from 'react-router-dom';
import CarManagement from './car-management/CarManagement';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

function App() {
  const navigate = useNavigate();
  const account = useSelector(state => state);
  let tokenID = localStorage.getItem('tokenId');
  // useEffect(() => {
  //   tokenID = localStorage.getItem('tokenId');
  //   if(!tokenID) {
  //     console.log(tokenID);
  //     navigate('/login');
  //   }
  // }, [tokenID])
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
