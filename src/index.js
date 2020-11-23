import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Journal from './Journal/Journal';
import NavBar from './Dashboard/NavBar';

//import 'antd/dist/antd.css';
//import {DatePicker} from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Switch>
        <Route path="/journal">
          <Journal />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
