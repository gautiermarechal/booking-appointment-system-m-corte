import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
//COMPONENTS IMPORTS ------------------------------------
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import NavigationBar from './components/NavigationBar';
import WelcomeHeader from './components/WelcomeHeader';
import HomePage from './components/HomePage';
import SignUpSuccessful from './components/SignUpSuccessful';
// ------------------------------------------------------

//ROUTER IMPORTS-----------------------------------------
import { BrowserRouter as Router } from 'react-router-dom'; 
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
//------------------------------------------------------

function App() {
  return (
    <Router>
    <div style={{backgroundColor: '#F0F2F5',}}>
    <NavigationBar/>
    <Container className="main">
      <Route exact path="/">
        <WelcomeHeader/>
        <HomePage/>
      </Route>
      <Route path="/login">
      <LoginForm/>
      </Route>
      <Route path="/signup">
        <SignUpForm/>
      </Route>
      <Route path="/signup-successful">
        <SignUpSuccessful/>
      </Route>
    </Container>
    </div>
    </Router>
  );
}

export default App;
