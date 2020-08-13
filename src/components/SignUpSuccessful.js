import React, { useState, useEffect } from 'react';
import styles from './SignUpSuccessful.module.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function SignUpSuccessful(){
    return(
        <Row className={styles.mainRow}>
            <Row className={styles.internalFormContainer}>
            <h3 style={{textAlign: 'center'}}>Thanks for signing up! You can now log in to your account here:</h3>
            <Button className={styles.signUpButton} variant="outline-dark" href="/login">Log In</Button>
            </Row>
        </Row>
    );
}

export default SignUpSuccessful;