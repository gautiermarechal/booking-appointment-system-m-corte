import React, { useEffect, useState } from 'react';
import styles from './MyAppointments.module.css';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

import Table from 'react-bootstrap/Table'
import apis from '../api';

function MyAppointments(props){
    const [myAppointments, setMyAppointments] = useState([]);

    useEffect(()=>{
        async function get(){
        try{
            await apis.getAppointments().then(res => {
            setMyAppointments(res.data.data.filter(element => element.customer._id === props.customerInfo._id));
            })
        }
        catch(e){
            console.log(e);
        }
    }
    get();
        
    }
    ,[]);

    function Appointment(props){
        return (
            <Alert variant="success" className={styles.appointment}>
            <Alert.Heading>Appointment</Alert.Heading>
            <p>ID# of appointment: {props.info._id}</p>
            <hr />
            <p>
            Date and time: <strong>{props.info.startTime[0].day}/{props.info.startTime[0].month}/{props.info.startTime[0].year} at {props.info.startTime[0].time}</strong>
            <br/>
            Barber: <strong>{props.info.barber.firstName} {props.info.barber.lastName}</strong>
            <br/>
            Service: <strong>{props.info.service}</strong>
            </p>
            </Alert>
        );
    }


    return(
        <>
            <h1>My Appointments</h1>
            <Row className={styles.mainRow}>
            {myAppointments.map((element, index)=> {
                return <Appointment key={index} info={element}/>;
            })}
            </Row>
        </>
    );
}

export default MyAppointments;