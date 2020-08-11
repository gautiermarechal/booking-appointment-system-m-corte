import React, { useEffect, useState } from 'react';
import styles from './DashboardAdmin.module.css';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import apis from '../api';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faCut } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import {
    Link
  } from "react-router-dom";

function DashboardAdmin(props){


    return(
        <>
        <Row className={styles.mainRow} >
        <Row className={styles.internalFormContainer}>
        <Row style={{width: '100%', textAlign: 'center', justifyContent: 'center'}}><h1 className={styles.welcomeHeader}>Dashboard Admin</h1></Row>
        <Link to="/barbers-admin" style={{height: '100%', width: '40%', borderRadius: '20px', margin: '10px', minWidth: 'fit-content',}}>
        <Card style={{ width: '100%', height: '250px', borderStyle: 'none' }} className={styles.cardContainer}>
        <Button variant="outline-dark" className={styles.dashboardButton} style={{height: '100%', borderRadius: '20px'}}>
            <Card.Body>
            <FontAwesomeIcon icon={faCut} style={{fontSize: '100px', margin: '20px'}}/>
            <Card.Title className="text-center" >Barbers</Card.Title>
            </Card.Body>
        </Button>
        </Card>
        </Link>
        <Link to="/customers-admin" style={{height: '100%', width: '40%', borderRadius: '20px', margin: '10px', minWidth: 'fit-content',}}>
        <Card style={{ width: '100%', height: '250px', borderStyle: 'none' }} className={styles.cardContainer}>
        <Button variant="outline-dark" className={styles.dashboardButton} style={{height: '100%'}}>
            <Card.Body>
            <FontAwesomeIcon icon={faUser} style={{fontSize: '100px', margin: '20px'}}/>
            <Card.Title className="text-center" >Customers</Card.Title>
            </Card.Body>
        </Button>
        </Card>
        </Link>
        <Link to="/all-appointments-admin" style={{height: '100%', width: '40%', borderRadius: '20px',margin: '10px',minWidth: 'fit-content',}}>
        <Card style={{ width: '100%', height: '250px', borderStyle: 'none' }} className={styles.cardContainer}>
        <Button variant="outline-dark" className={styles.dashboardButton} style={{height: '100%', borderRadius: '20px'}}>
            <Card.Body>
            <FontAwesomeIcon icon={faList} style={{fontSize: '100px', margin: '20px'}}/>
            <Card.Title className="text-center" >Appointments</Card.Title>
            </Card.Body>
        </Button>
        </Card>
        </Link>
        <Link to="/my-appointments-admin" style={{height: '100%', width: '40%', borderRadius: '20px', margin: '10px', minWidth: 'fit-content',}}>
        <Card style={{ width: '100%', height: '250px', borderStyle: 'none' }} className={styles.cardContainer}>
        <Button variant="outline-dark" className={styles.dashboardButton} style={{height: '100%', borderRadius: '20px'}}>
            <Card.Body>
            <FontAwesomeIcon icon={faCalendarCheck} style={{fontSize: '100px', margin: '20px'}}/>
            <Card.Title className="text-center" >Your Appointments</Card.Title>
            </Card.Body>
        </Button>
        </Card>
        </Link>
        </Row>
        </Row>
        </>
    );
}

export default DashboardAdmin;