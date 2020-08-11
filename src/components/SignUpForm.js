import React, { useState, useEffect } from 'react';
import styles from './SignUpForm.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apis from '../api';


function SignUpForm () {
    //Customer Info States
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [emailConfirm, setEmailConfirm] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    //Forms Validations
    const [validateFirstName, setValidateFirstName] = useState(null);
    const [validateLastName, setValidateLastName] = useState(null);
    const [validateEmail, setValidateEmail] = useState(null);
    const [validateConfirmEmail, setValidateConfirmEmail] = useState(null);
    const [validatePassword, setValidatePassword] = useState(null);
    const [validateConfirmPassword, setValidateConfirmPassword] = useState(null);

    //Validation Error messages
    function GeneralFieldValidation(props) {
        const isValid = props.isValid;

        if(isValid === null){
            return <p>Required</p>
        }
        if(isValid){
            return <p style={{color: 'green'}}>All Good!</p>
        }
        if(!isValid){
            return <p style={{color: 'red'}}>This field is not correct.</p>
        }
    }

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

    function ConfirmValidationEmail(props){
        const isValid = props.isValid;

        if(isValid === null){
            return <p>Required</p>
        }
        if(isValid){
            return <p style={{color: 'green'}}>All Good!</p>
        }
        if(!isValid){
            return <p style={{color: 'red'}}>Both fields do not match.</p>
        }
    }

    function PasswordValidation(props) {
        const isValid = props.isValid;

        if(isValid === null){
            return <p>Required. At least 8 characters long.</p>
        }
        if(isValid){
            return <p style={{color: 'green'}}>All Good!</p>
        }
        if(!isValid){
            return <p style={{color: 'red'}}>This password is not correct.</p>
        }
    }

    function ConfirmValidationPassword(props){
        const isValid = props.isValid;

        if(isValid === null){
            return <p>Required</p>
        }
        if(isValid){
            return <p style={{color: 'green'}}>All Good!</p>
        }
        if(!isValid){
            return <p style={{color: 'red'}}>Both fields do not match.</p>
        }
    }

    //Handling Functions
    function handleFirstNameChange (event){
        if(event.target.value === ''){
            setValidateFirstName(false);
        }
        else{
            setValidateFirstName(true);
        }
        setFirstName(event.target.value);
    }

    function handleLastNameChange (event){
        if(event.target.value === ''){
            setValidateLastName(false);
        }
        else{
            setValidateLastName(true);
        }
        setLastName(event.target.value);
    }

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

    function handleEmailConfirm (event){
        if(event.target.value === '' || event.target.value !== email){
            setValidateConfirmEmail(false);
        }
        else{
            setValidateConfirmEmail(true);
        }
        setEmailConfirm(event.target.value);
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

    function handlePasswordConfirm (event){
        if(event.target.value === '' || event.target.value !== password){
            setValidateConfirmPassword(false);
        }
        else{
            setValidateConfirmPassword(true);
        }
        setPasswordConfirm(event.target.value);
    }

    const handleCreateCustomer = async (event) => {
        if(validateFirstName &&
            validateLastName &&
             validateEmail &&
             validateConfirmEmail &&
             validatePassword &&
             validateConfirmPassword){

            window.alert("Creating customer!");



            const payload = {firstName, lastName, email, password}
    
            await apis.createCustomer(payload).then(res  => {
                console.log("Customer created successfully!");
            }
            )
    
        }
        else{
            event.preventDefault();
        }
        

    }

    return(
        <Row className={styles.mainRow}>
            <div className={styles.formContainer}>
            <div className={styles.welcomeHeader}>
                    <h2 >Welcome to the family!</h2>
                    <h4>Sign up below</h4>
            </div>
                <Form className={styles.internalFormContainer}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className={styles.inputElement} type="string" placeholder="Enter your first name" onChange={handleFirstNameChange}/>
                            <Form.Text className="text-muted">
                            <GeneralFieldValidation isValid={validateFirstName}/>
                            </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className={styles.inputElement} type="string" placeholder="Enter your last name" onChange={handleLastNameChange}/>
                            <Form.Text className="text-muted">
                            <GeneralFieldValidation isValid={validateLastName}/>
                            </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className={styles.inputElement} type="email" placeholder="Enter your email address" onChange={handleEmailChange}/>
                            <Form.Text className="text-muted">
                                <EmailValidation isValid={validateEmail}/>
                            </Form.Text>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formBasicConfirmEmail">
                        <Form.Label>Confirm Email address</Form.Label>
                        <Form.Control className={styles.inputElement} type="email" placeholder="Confirm your email address" onChange={handleEmailConfirm}/>
                        <Form.Text className="text-muted">
                                <ConfirmValidationEmail isValid={validateConfirmEmail}/>
                            </Form.Text>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={styles.inputElement} type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        <Form.Text className="text-muted">
                            <PasswordValidation isValid={validatePassword}/>
                            </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className={styles.inputElement} type="password" placeholder="Confirm Password" onChange={handlePasswordConfirm}/>
                        <Form.Text className="text-muted">
                                <ConfirmValidationPassword isValid={validateConfirmPassword}/>
                            </Form.Text>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group className={styles.signUpButtonContainer}>
                    <Button className={styles.signUpButton} variant="outline-dark" type="submit" onClick={handleCreateCustomer} href="/signup-successful">
                        Sign Up
                    </Button>
                    </Form.Group>
                </Form>
                </div>
        </Row>
    );
}

export default SignUpForm;