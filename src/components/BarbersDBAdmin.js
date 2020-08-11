import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import apis from '../api/index';
import MyAppointmentsAdmin from './MyAppointmentsAdmin';
import styles from './BarbersDBAdmin.module.css';

function BarbersDBAdmin(props) {
    const [barbers, setBarbers] = useState([]);
    const [barberAppointments, setBarberAppointments] = useState([]);

    useEffect(
        ()=> {
            async function get(){
                await apis.getBarbers().then(res => {
                    setBarbers(res.data.data);
                })
                await apis.getAppointments().then(res => {
                    setBarberAppointments(res.data.data);
                })
            }
            get();
        }
    ,[]);

    return(
        <Row style={{ color: 'white'}}className={styles.mainRow}>
            <h1>Barbers</h1>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                    <th>#ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Available Times</th>
                    <th>Appointments</th>
                    </tr>
                </thead>
                <tbody>
                    {barbers.map(element => {
                        return(
                        <tr>
                        <td>{element._id}</td>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.email}</td>
                        <td>{element.password}</td>
                        <td>
                        <Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr>
                            <th>Start</th>
                            <th>End</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{element.availableTimes.map(element => {return <tr><td>{element.start.month}/{element.start.day}/{element.start.year}, {element.start.time}</td></tr>})}</td>
                            <td>{element.availableTimes.map(element => {return <tr><td>{element.end.month}/{element.end.day}/{element.end.year}, {element.end.time}</td></tr>})}</td>
                            </tr>
                        </tbody>
                        </Table>
                        </td>
                        <td>
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
                    {barberAppointments.map(element => {
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
                        </td>
                        </tr>
                        );
                    })}
                    
                </tbody>
            </Table>
        </Row>
    );
}

export default BarbersDBAdmin;