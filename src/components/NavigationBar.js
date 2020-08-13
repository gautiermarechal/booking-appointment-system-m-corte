import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styles from './NavigationBar.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import mr_corte_logo from '../assets/mr_corte_logo.jpeg'


function NavigationBar (props) {
    let history = useHistory();

    function handleLogOut(){
        localStorage.clear()
        history.push('/')
        window.location.reload();
        props.setLogOut()
    }

    const customerInfo = props.customerInfo;



    return(
        <Navbar collapseOnSelect expand="md" fixed="top" className={styles.navbarContainer}>
            {props.isLoggedIn 
            ?   <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.buttonIcon} ><FontAwesomeIcon icon={faBars}  className={styles.menuIcon}/></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link><Link onClick={handleLogOut} className={styles.links}>Log Out</Link></Nav.Link>
                <Nav.Link><Link to={customerInfo.isAdmin?"/my-appointments-admin":"/my-appointments"} className={styles.links}><FontAwesomeIcon icon={faList}/> Your Appointments</Link></Nav.Link>
                {customerInfo.isAdmin? <></> : <Nav.Link><Link to="/booking" className={styles.links}><Button variant="outline-light"><FontAwesomeIcon icon={faCalendarCheck} style={{marginRight: '5px'}}/>Book</Button></Link></Nav.Link>}
                <Navbar.Brand><Link to={customerInfo.isAdmin?"/dashboard-admin":"/dashboard"} className={styles.customerName}>{customerInfo.firstName} {customerInfo.lastName}</Link></Navbar.Brand>
                </Navbar.Collapse>
                <Navbar.Brand><Link to="/" className={styles.logoCorte}>Mr Corte - Barbershop<img src={mr_corte_logo} className={styles.corteLogo}/></Link></Navbar.Brand>
                </>
                
            :   <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.buttonIcon} ><FontAwesomeIcon icon={faBars} className={styles.menuIcon}/></Navbar.Toggle>
                <Navbar.Collapse style={{color: 'white', backgroundColor: 'black'}} id="responsive-navbar-nav">
                <Nav.Link><Link to="/about-us" className={styles.links}>About Us</Link></Nav.Link>
                <Nav.Link><Link to="/services" className={styles.links}>Services</Link></Nav.Link>
                <Nav.Link><Link to="/our-barbers" className={styles.links}>Our Barbers</Link></Nav.Link>
                <Nav.Link><Link to="/our-location" className={styles.links}>Our Location</Link></Nav.Link>
                <Nav.Link><Link to="/our-location" className={styles.links}>Gallery</Link></Nav.Link>
                <Nav.Link><Link to="/login" className={styles.links}>Log In</Link></Nav.Link>
                <Nav.Link><Link to="/signup" className={styles.links}>Sign Up</Link></Nav.Link>
                </Navbar.Collapse> 
                <Navbar.Brand><Link to="/" className={styles.logoCorte}>Mr Corte - Barbershop<img src={mr_corte_logo} className={styles.corteLogo}/></Link></Navbar.Brand>
                </>
             }
            
        </Navbar>
    );
}

export default NavigationBar;