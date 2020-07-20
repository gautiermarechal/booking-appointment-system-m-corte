import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './WelcomeHeader.module.css';

function HomePage() {
    return(
        <Row className={styles.mainRow}>
            <Col>Log In</Col>
            <Col>Sign Up</Col>
        </Row>
    );
}

export default HomePage;