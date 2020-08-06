import React, { useState, useEffect } from 'react';
import { useStateWithLocalStorage } from './api/useStateWithLocalStorage.js';
import { AppContext } from "./libs/contextLibs";
import './App.css';
import Container from 'react-bootstrap/Container';
import { Auth } from "aws-amplify";
//COMPONENTS IMPORTS ------------------------------------
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import NavigationBar from './components/NavigationBar';
import WelcomeHeader from './components/WelcomeHeader';
import HomePage from './components/HomePage';
import SignUpSuccessful from './components/SignUpSuccessful';
import Booking from './components/Booking';
import BookingConfirm from './components/BookingConfirm';
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
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [customerInfoArray, customerHasCreatedInfo] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState({});
  const [userSession, setUserSession] = useStateWithLocalStorage('userSession');

  useEffect(() => {
    onLoad();
  }, []);

  function setLogOut(){
    userHasAuthenticated(false);
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        console.log(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && 
    <AppContext.Provider value = {{ isAuthenticated, userHasAuthenticated, customerInfoArray, customerHasCreatedInfo, bookingConfirmed, setBookingConfirmed }}>
    <Router>
    <div style={{backgroundColor: '#F0F2F5',}}>
    <NavigationBar isLoggedIn={isAuthenticated} customerInfo={userSession} setLogOut={() => setLogOut}/>
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
      <Route path="/booking">
        <Booking customerInfo={userSession}/>
      </Route>
      <Route path="/booking-confirmation">
        <BookingConfirm customerInfo={userSession} bookingInfo={bookingConfirmed}/>
      </Route>
    </Container>
    </div>
    </Router>
    </AppContext.Provider>
  );
}

export default App;
