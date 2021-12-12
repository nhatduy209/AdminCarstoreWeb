/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import HomeLayout from './home/HomeLayout';
import Login from './login/Login';
import {
  Routes ,
  Route,
  Navigate 
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes >
        <Route
          exact
          path="/"
          render={() => {
              return (
                <Navigate to="/login" />
              )
          }}
        />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/home" element={<HomeLayout/>} />
        <Route exact path="/list" element={<HomeLayout/>} />
        <Route exact path="/booking" element={<HomeLayout/>} />
        <Route exact path="/store-info" element={<HomeLayout/>} />
      </Routes>
    </div>
  )
}

export default App;
