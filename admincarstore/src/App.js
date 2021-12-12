/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { useState } from 'react';
import Navigator from './component/navigator/Navidator';
import Header from './component/header/Header';
import {useSelector} from 'react-redux';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const account = useSelector(state => state.AccountReducer);
  // const dispatch = useDispatch();
  console.log('HELLO ', account);
  console.log(isOpen);
  return (
    <div className="App">
      <div className='main-layout'>
        <Navigator/>
        <div className='main-page'>
          {Header(setIsOpen,isOpen)}
          hello
        </div>
      </div>
    </div>
  )
}

export default App;
