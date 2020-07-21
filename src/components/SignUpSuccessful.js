import React, { useState, useEffect } from 'react';
import styles from './SignUpSuccessful.module.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function SignUpSuccessful(){
    return(
        <React.Fragment>
        <Row className={styles.mainRow}>
            <h3>Thanks for signing up! You can now log in to your account here:</h3>
        </Row>
        <Row className={styles.mainRow2}><Button variant="success" href="/login">Log In</Button></Row>
        </React.Fragment>
    );
}

export default SignUpSuccessful;