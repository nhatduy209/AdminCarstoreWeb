/* eslint-disable react/react-in-jsx-scope */
import logo from './logo.svg';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFakeAPI} from './Redux/reducer/AccountReducer';
const App = () => {
  const account = useSelector(state => state.AccountReducer);
  const dispatch = useDispatch();
  console.log('HELLO ', account);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello {account.email}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={() => dispatch(fetchFakeAPI())}>Change name </button>
      </header>
    </div>
  );
};

export default App;
