import React, { useEffect, useState } from 'react';
import styles from './MyAppointments.module.css';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import apis from '../api';

function MyAppointments(props){
    const [myAppointments, setMyAppointments] = useState([]);

    useEffect(()=>{
        async function get(){
        try{
            await apis.getAppointments().then(res => {
            setMyAppointments(res.data.data.filter(element => element.customer._id === props.customerInfo._id).reverse());
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
            <Alert variant="info" className={styles.appointment}>
            <Alert.Heading>Appointment</Alert.Heading>
            <p style={{overflow: 'scroll'}}>ID# of appointment: <strong > {props.info._id} </strong></p>
            <p>Created: <strong>{props.info.createdAt}</strong> </p>
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
            <Row className={styles.mainRow}>
            <h1 style={{textAlign: 'center', color: 'white', marginTop: '130px'}}>
                Your Appointments:
            </h1> 
            <Row className={styles.internalFormContainer}>
            {myAppointments.map((element, index)=> {
                return <Appointment key={index} info={element}/>;
            })}
            </Row>
            </Row>
        </>
    );
}

export default MyAppointments;