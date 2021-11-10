import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PrivateRouter from './components/PrivateRoute';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout';
import LoginPage from './views/login';
import './App.css';

function App() {

  return (
    <>
      <CssBaseline/>
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={LoginPage}/>
            <PrivateRouter path="/" component = {Layout}/>
          </Switch>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
