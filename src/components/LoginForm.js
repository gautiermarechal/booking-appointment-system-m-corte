import React, {useEffect, useState} from 'react';
import styles from './LoginForm.module.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apis from '../api';



function LoginForm () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [customers, setCustomers] = useState([]);

    // useEffect(async () => {
    //     await apis.getCustomers().then(customers => {
    //         setCustomers(customers.data);
    //     })
    // }, [])

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
        if(  validateEmail && validatePassword){

            window.alert("Logging in customer!");

            const payload = {email, password}
    
            await apis.getCustomerByEmail().then(customer  => {
                if(customer.password === password){
                    console.log('Logged in successfully!')
                }
                else{
                    console.log('Error in login!')
                    return;
                }
            }
            )
    
        }
        else{
            event.preventDefault();
        }
        

    }
    return(
        <Row className={styles.mainRow}>
                <Form className={styles.formContainer}>
                <h2>Log In</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                        <Form.Text className="text-muted">
                                <EmailValidation isValid={validateEmail}/>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                        <Form.Text className="text-muted">
                                <PasswordValidation isValid={validatePassword}/>
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleLogInCustomer} href="/signup-successful">
                        Log In
                    </Button>
                </Form>
        </Row>
    );
}

export default LoginForm;