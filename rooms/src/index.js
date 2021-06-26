import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {RecoilRoot} from 'recoil'
import {BrowserRouter as Router} from 'react-router-dom'

import './styles/style.css'
import {atom} from 'recoil'



export const isSetNickname = atom({
  key: 'isSetNickname',
  default: true
})
export const pop = atom({
  key: 'pop',
  default: false
})
export const menuColor = atom({
  key: 'menucolor',
  default: '#34ef'
})
export const menuOpen = atom({
  key: 'menuOpen',
  default: false
})

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

