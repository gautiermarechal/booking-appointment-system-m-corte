import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import shopImage from '../assets/allef-vinicius-IvQeAVeJULw-unsplash.jpg';

import styles from './HomePage.module.css';

function HomePage(props) {
    return(
        <Row className={styles.mainRow}>
            <div className={styles.mainTitle}>
            <h1>MR. CORTE</h1>
            <h1>Salon Barbier</h1>
            <Button href={props.isLoggedIn? "/booking":"/login"} variant="outline-light" className={styles.mainButton} size="lg">Schedule an appointment</Button>
            </div>
        </Row>
    );
}

export default HomePage;