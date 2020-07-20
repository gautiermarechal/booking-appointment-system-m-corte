import React from 'react';
import styles from './SignUpForm.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SignUpForm () {
    return(
        <Row className={styles.mainRow}>
                <Form className={styles.formContainer}>
                <h2>Sign Up</h2>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="string" placeholder="Enter your first name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="string" placeholder="Enter your last name" />
                    </Form.Group>
                </Form.Row>
                
                    <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicConfirmEmail">
                        <Form.Label>Confirm Email address</Form.Label>
                        <Form.Control type="email" placeholder="Confirm your email address" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
        </Row>
    );
}

export default SignUpForm;