import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import apis from '../api';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import {
    Link
  } from "react-router-dom";

function Dashboard(props){


    return(
        <>
        <Row className={styles.mainRow}>
        <Row className={styles.internalFormContainer}>
        <Row style={{width: '100%', textAlign: 'center', justifyContent: 'center'}}><h1 className={styles.welcomeHeader}>Dashboard</h1></Row>
        <Row style={{textAlign: 'center', justifyContent: 'center'}} className={styles.internalRow}>
        <Link to="/booking" style={{ width: '40%', borderRadius: '20px', margin: '10px', minWidth: 'fit-content',}}>
        <Card style={{ borderRadius: '20px', height: '350px', margin: '10px', borderStyle: 'none' }} className={styles.cardContainer}>
        <Button variant="outline-dark" style={{height: '100%', borderRadius: '20px'}} className={styles.dashboardButton}>
            <Card.Body>
            <FontAwesomeIcon icon={faCalendarCheck} style={{fontSize: '100px', margin: '20px'}}/>
            <Card.Title className="text-center" >Book an appointment</Card.Title>
            </Card.Body>
        </Button>
        </Card>
        </Link>
        <Link to="/my-appointments" style={{height: '100%', width: '40%', borderRadius: '20px', margin: '10px', minWidth: 'fit-content',}}>
        <Card style={{ borderRadius: '20px', height: '350px', margin: '10px', borderStyle: 'none' }} className={styles.cardContainer}>
        <Button variant="outline-dark" style={{height: '100%', borderRadius: '20px'}} className={styles.dashboardButton}>
            <Card.Body>
            <FontAwesomeIcon icon={faList} style={{fontSize: '100px', margin: '20px'}}/>
            <Card.Title className="text-center" >Your Appointments</Card.Title>
            </Card.Body>
        </Button>
        </Card>
        </Link>
        </Row>
        </Row>
        </Row>
        </>
    );
}

export default Dashboard;