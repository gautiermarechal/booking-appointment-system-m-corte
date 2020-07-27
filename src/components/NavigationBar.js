import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './NavigationBar.module.css';
import { Link } from 'react-router-dom';

function NavigationBar (props) {
    return(
        <Navbar collapseOnSelect expand="md"  bg="dark" className={styles.navbarContainer}>
            {props.isLoggedin 
            ?   <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse style={{color: 'white'}} id="responsive-navbar-nav">
                <Navbar.Brand><Link to="/" className={styles.brandText}>Mr. Corte - Barbershop</Link></Navbar.Brand>
                <Nav.Link><Link to="/login" className={styles.links}>Log In</Link></Nav.Link>
                <Nav.Link><Link to="/signup" className={styles.links}>Sign Up</Link></Nav.Link>
                <Navbar.Brand><Link to="/" className={styles.customerName}>{props.customerInfo.firstName} {props.customerInfo.lastName}</Link></Navbar.Brand>
                </Navbar.Collapse>
                </>
                
            :   <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse style={{color: 'white'}} id="responsive-navbar-nav">
                <Navbar.Brand><Link to="/" className={styles.brandText}>Mr. Corte - Barbershop</Link></Navbar.Brand>
                <Nav.Link><Link to="/login" className={styles.links}>Log In</Link></Nav.Link>
                <Nav.Link><Link to="/signup" className={styles.links}>Sign Up</Link></Nav.Link>
                <Navbar.Brand><Link to="/" className={styles.customerName}>{props.customerInfo.firstName} {props.customerInfo.lastName}</Link></Navbar.Brand>
                </Navbar.Collapse> 
                </>
             }
            
        </Navbar>
    );
}

export default NavigationBar;