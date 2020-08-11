import React from 'react';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert'
import styles from './BookingConfirm.module.css';

function BookingConfirm(props) {
    return(
        <>
        <Row className={styles.mainRow}>
            <div className={styles.internalFormContainer}>
        <h1 style={{textAlign: 'center'}}>Your appointment is confirmed!
                Thank you for your booking!
            </h1>
        <Alert className={styles.appointmentStyle} variant="info">
            <Alert.Heading>Available Appointment:</Alert.Heading>
            <hr />
            <ul>
            <h3>{props.customerInfo.firstName} {props.customerInfo.lastName} Appointment</h3>
                <li>
                Date and time: 
                <strong>
                    { props.bookingInfo["startTime"].month}/{props.bookingInfo["startTime"].day}/{props.bookingInfo["startTime"].year}
                </strong>
                </li>
            <li>
                Barber: {props.bookingInfo["barber"].firstName } {props.bookingInfo["barber"].lastName }<strong></strong>
            </li>
            <li>
                Service: {props.bookingInfo["service"]}<strong></strong>
            </li>
            </ul>
            </Alert>
            </div>
        </Row>
        </>
    );
}

export default BookingConfirm;