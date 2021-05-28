import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { AccountState } from './types/account'

import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

import './App.css';

const App: React.FC = () => {
  const account: AccountState = useSelector((state: any) => state.account);
  return (
    <Router>
      <main>
        <Route path="/login" component={LoginScreen} />
        <Route path="/home" component={HomeScreen} />
        <Route exact path="/">
          { account.isConnected? <Redirect to="/home"/>:<Redirect to="/login"/>}
        </Route>
      </main>
    </Router>
  );
}

export default App;
