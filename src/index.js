import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Journal from './Journal/Journal';
import NavBar from './Dashboard/NavBar';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Settings from './Settings/Settings';

const LoginContainer = () => (
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LoginForm} />
    <Route path="/register" component={RegisterForm} />
  </div>
);

const DefaultContainer = () => (
  <div className="container">
    <NavBar />
    <Switch>
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/journal" component={Journal} />
      <ProtectedRoute path="/" component={Dashboard} />
    </Switch>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>

        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/register" component={LoginContainer} />
        <Route component={DefaultContainer} />

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
