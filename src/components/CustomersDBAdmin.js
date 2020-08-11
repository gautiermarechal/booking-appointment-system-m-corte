import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import apis from '../api/index';

import styles from './CustomersDBAdmin.module.css';

function CustomersDBAdmin() {
    const [customers, setCustomers] = useState([]);

    useEffect(
        ()=> {
            async function get(){
                await apis.getCustomers().then(res => {
                    setCustomers(res.data.data);
                })
            }
            get();
        }
    ,[]);

    return(
        <Row className={styles.mainRow}>
            <h1 style={{height: '50px', color: 'white'}}>Customers</h1>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                    <th>#ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(element => {
                        return(
                        <tr>
                        <td>{element._id}</td>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.email}</td>
                        <td>{element.password}</td>
                        </tr>
                        );
                    })}
                    
                </tbody>
            </Table>
        </Row>
    );
}

export default CustomersDBAdmin;