import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import apis from '../api/index';

import styles from './AllAppointments.module.css';

function AllAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(
        ()=> {
            async function get(){
                await apis.getAppointments().then(res => {
                    setAppointments(res.data.data);
                })
            }
            get();
        }
    ,[]);

    return(
        <Row className={styles.mainRow}>
            <h1>Appointments</h1>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                    <th>#ID Appointment</th>
                    <th>Start Time</th>
                    <th>#ID Customer</th>
                    <th>Customer</th>
                    <th>#ID Barber</th>
                    <th>Barber</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(element => {
                        return(
                        <tr>
                        <td>{element._id}</td>
                        <td>{element.startTime[0].year}/{element.startTime[0].month}/{element.startTime[0].day}, {element.startTime[0].time}</td>
                        <td>{element.customer._id}</td>
                        <td>{element.customer.firstName} {element.customer.lastName}</td>
                        <td>{element.barber._id}</td>
                        <td>{element.barber.firstName} {element.barber.lastName}</td>
                        </tr>
                        );
                    })}
                    
                </tbody>
            </Table>
        </Row>
    );
}

export default AllAppointments;