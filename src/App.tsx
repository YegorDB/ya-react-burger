import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function App() {
  const [current, setCurrent] = React.useState('one');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One1
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two2
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three3
        </Tab>
      </div>
    </div>
  );
}

export default App;
