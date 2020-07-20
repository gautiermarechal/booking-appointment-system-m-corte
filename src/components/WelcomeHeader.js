import React from 'react';
import styles from './WelcomeHeader.module.css';
import Row from 'react-bootstrap/Row';

function WelcomeHeader (){
    return(
    <Row className={styles.headerRow}>
        <h1 className={styles.header}>Welcome to Mr. Corte. If you are a new customer, we invite you to sign up here.</h1>
    </Row>
    );
}

export default WelcomeHeader;