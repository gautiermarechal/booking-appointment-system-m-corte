import React, { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import apis from '../api';
//Calendar IMPORTS---------------
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import Calendar from 'rc-calendar';
//--------------------------------

function Booking(){
    const [barbers, setBarbers] = useState([]);
    const [barberAvailableTimes, setBarberAvailableTimes] = useState();
    const [chosenHairCut, setChosenHairCut] = useState();
    const [chosenBarber, setChosenbarber] = useState();
    const [chosenDate, setChosenDate] = useState();
    const [timeSlotsToDisplay, setTimeSlotToDisplay] = useState([]);
    const [appointmentsToDisplay, setAppointmentsToDisplay] = useState([]);

    useEffect(() => {
        async function get(){
            await apis.getBarbers().then(res => { 
                setBarbers(res.data.data)
            }
                ).catch(error => {
                    console.log(error);
                })
        }
        get()
    }
    ,[]);

    function generateOptions(length, excludedOptions) {
        const arr = [];
        for (let value = 0; value < length; value++) {
          if (excludedOptions.indexOf(value) < 0) {
            arr.push(value);
          }
        }
        return arr;
      }

    function disabledMinutes(h) {
        switch (h) {
          case 9:
            return generateOptions(60, [30]);
          case 21:
            return generateOptions(60, [0]);
          default:
            return generateOptions(60, [0, 30]);
        }
      }

    function disabledSeconds() {
        return Array(61).join(0).split(0).map((v, i) => i + 1)
      }

    function disabledDate(current) {
        if (!current) {
          // allow empty select
          return false;
        }
        const date = moment();
        date.hour(0);
        date.minute(0);
        date.second(0);
        return current.valueOf() < date.valueOf();  // can not select days before today
      }

    function handleHairCutChoice(event){
        console.log("haircut chosen");
        setChosenHairCut(event.target.value);
    }

    function handleBarberChoice(event){
        console.log("barber chosen");
        setChosenbarber(event.target.value);
        findChosenBarber(event.target.value)
    }

    function handleDateChoice(event){
        try{
        console.log(event._d);
        const formattedDateArray = event._d.toString().split(" ");
        const dayName = formattedDateArray[0];
        const month = formattedDateArray[1];
        const dayNum = formattedDateArray[2];
        const year = formattedDateArray[3];
        console.log(formattedDateArray);
        setChosenDate(event._d);

        for(let i = 0; i <= barberAvailableTimes.length - 1; i++){
            if(dayNum === barberAvailableTimes[i].start.day){
                timeSlotsToDisplay.indexOf(barberAvailableTimes[i]) === -1 
                ? timeSlotsToDisplay.push(barberAvailableTimes[i])
                : console.log("Item already exists");
            }
        }
    }
        catch(e){
            return;
        }
    }

    async function findChosenBarber(chosenBarber){
        const stringBarber = chosenBarber.split(" ");
        const firstNameBarber = stringBarber[0]
        const lastNameBarber = stringBarber[1]
        const foundBarber = barbers.find(barber => barber.firstName === firstNameBarber && barber.lastName === lastNameBarber);
        const barberID = foundBarber._id;
        await apis.getBarberByID(barberID).then(res => { 
            setBarberAvailableTimes(res.data.data.availableTimes)
        }
            ).catch(error => {
                console.log(error);
            })
    }

    function Appointment(props){
        return (
            <Alert variant="success">
            <Alert.Heading>Available Appointment:</Alert.Heading>
            <hr />
            <p>
            Date and time: <strong>{props.date.start.day}/{props.date.start.month}/{props.date.start.time}</strong>
            <br/>
            Barber: <strong>{chosenBarber}</strong>
            <br/>
            Service: <strong>{chosenHairCut}</strong>
            </p>
            <Button variant="primary" type="submit">
                Book
            </Button> 
            </Alert>
        );
    }
    
    return(
        <>
        <Row className={styles.mainRow}>
        <Form className={styles.formContainer}>
            <h2>Your Booking</h2>
            <Form.Group name="haircut">
                <Form.Label ><strong>Choose your haircut:</strong></Form.Label>
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Male Haircut (20 min)"} type="radio" label="Male Haircut (20 min)" value="Male Haircut (20 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Male Haircut + Shampoo (30 min)"} type="radio" label="Male Haircut + Shampoo (30 min)" value="Male Haircut + Shampoo (30 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Female Haircut (30 min)"} type="radio" label="Female Haircut (30 min)" value="Female Haircut (30 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Female Haircut + Shampoo (40 min)"} type="radio" label="Female Haircut + Shampoo (40 min)" value="Female Haircut + Shampoo (40 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Male Color (120 min)"} type="radio" label="Male Color (120 min)" value="Male Color (120 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Female Color (120 min)"} type="radio" label="Female Color (120 min)" value="Female Color (120 min)"   />
            </Form.Group>
            <Form.Group>
                <Form.Label ><strong>Pick a barber:</strong></Form.Label>
                <Form.Control as="select" custom onChange={handleBarberChoice}>
                    {barbers.map((barber) => (
                        <option>{barber.firstName} {barber.lastName}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label ><strong>Pick a date:</strong></Form.Label>
                <Calendar
                disabledDate={disabledDate}
                onSelect={handleDateChoice}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label ><strong>Pick a Time:</strong></Form.Label>
                <Form.Group>
                {chosenDate && timeSlotsToDisplay.length !== 0 ? 
                timeSlotsToDisplay.map((timeSlot)=>
                    <Appointment date={timeSlot} />   
                )
                        : <p>No slot available</p>
                }
                </Form.Group>
            </Form.Group>
        </Form>
        </Row>
        </>
    )
}

export default Booking;