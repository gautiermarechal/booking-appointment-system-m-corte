import React, { useState, useEffect } from 'react';
import styles from './LoginForm.module.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apis from '../api';
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLibs";
import { useStateWithLocalStorage } from '../api/useStateWithLocalStorage.js';


function LoginForm () {
    const { userHasAuthenticated } = useAppContext();
    const { customerHasCreatedInfo } = useAppContext();
    let history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const [isEmployee, setIsEmployee] = useState(false);

    //Local Storage
    const [userSession, setUserSession] = useStateWithLocalStorage('userSession');
    const [sessionActive, setSessionActive] = useStateWithLocalStorage('sessionActive');
    //Forms Validations
    const [validateEmail, setValidateEmail] = useState(null);
    const [validatePassword, setValidatePassword] = useState(null);

    //Validation Error Message
    function EmailValidation(props) {
        const isValid = props.isValid;

        if(isValid === null){
            return <p>Required</p>
        }
        if(isValid){
            return <p style={{color: 'green'}}>All Good!</p>
        }
        if(!isValid){
            return <p style={{color: 'red'}}>This email is not correct.</p>
        }
    }

    function PasswordValidation(props) {
        const isValid = props.isValid;

        if(isValid === null){
            return <p>Required.</p>
        }
        if(isValid){
            return <p style={{color: 'green'}}>All Good!</p>
        }
        if(!isValid){
            return <p style={{color: 'red'}}>This password is not correct.</p>
        }
    }

    //Handling Functions
    function handleEmailChange (event){
        let atSymbol = new RegExp('@');
        let testAt = atSymbol.test(event.target.value);
        if(event.target.value === '' || !testAt){
            setValidateEmail(false);
        }
        else{
            setValidateEmail(true);
        }
        setEmail(event.target.value);
    }

    function handlePasswordChange (event){
        if(event.target.value === '' ||
         event.target.value === 'password' ||
          event.target.value === '123456789' ||
          event.target.value.length < 8){
            setValidatePassword(false);
        }
        else{
            setValidatePassword(true);
        }
        setPassword(event.target.value);
    }

    const handleLogInCustomer = async (event) => {
        event.preventDefault();
        if(  validateEmail && validatePassword){
            if(!isEmployee){
                await apis.getCustomerByEmail(email).then(res => {
                    if(res.data.success){
                        console.log(res);
                        if(res.data.data.password === password){
                            console.log('Customer Logged in!');
                            userHasAuthenticated(true);
                            customerHasCreatedInfo({
                                firstName: res.data.data.firstName,
                                lastName: res.data.data.lastName,
                                email: res.data.data.email
                            });
                            setUserSession({
                                _id: res.data.data._id,
                                firstName: res.data.data.firstName,
                                lastName: res.data.data.lastName,
                                email: res.data.data.email
                                }
                            );
                            setSessionActive(true);
                            history.push("/dashboard");
                            window.location.reload();
                        }
                        else{
                            return setShowModal(true);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    return setShowModal(true); 
                })  
            }
            else{
                await apis.getBarberByEmail(email).then(res => {
                    if(res.data.success){
                        console.log(res);
                        if(res.data.data.password === password){
                            console.log('Admin Logged in!');
                            userHasAuthenticated(true);
                            setUserSession({
                                _id: res.data.data._id,
                                firstName: res.data.data.firstName,
                                lastName: res.data.data.lastName,
                                email: res.data.data.email,
                                isAdmin: res.data.data.isAdmin,
                                }
                            );
                            setSessionActive(true);
                            history.push("/dashboard-admin");
                            window.location.reload();
                        }
                        else{
                            return setShowModal(true);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    return setShowModal(true); 
                })  
            }        
        }
        

    }

    function ModalFailedLogIn(props){
        return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Log In Failed</Modal.Title>
            </Modal.Header>
            <Modal.Body>We could not find you. Please retry or sign up.</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={handleClose} href={"/signup"}>
                Sign Up
            </Button>
            </Modal.Footer>
        </Modal>
            );
    }
    
    return(
        <Row className={styles.mainRow}>
            <div className={styles.formContainer}>
                <div className={styles.welcomeHeader}>
                    <h2 >Welcome back!</h2>
                    <h4>Log in below</h4>
                </div>
                <Form className={styles.internalFormContainer}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className={styles.inputElement} type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                        <Form.Text className="text-muted">
                                <EmailValidation isValid={validateEmail}/>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={styles.inputElement} type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        <Form.Text className="text-muted">
                                <PasswordValidation isValid={validatePassword}/>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin" onChange={() => { isEmployee? setIsEmployee(false) : setIsEmployee(true) }}/>
                    </Form.Group>
                    <Form.Group className={styles.loginButtonContainer}>
                    <Button variant="outline-dark" type="submit" onClick={handleLogInCustomer} href="/booking" className={styles.loginButton}>
                        Log In
                    </Button>
                    </Form.Group>  
                    <ModalFailedLogIn show={showModal}/>
                </Form>
                </div>
        </Row>
    );
}

export default LoginForm;