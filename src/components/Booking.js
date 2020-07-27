import React, { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apis from '../api';
//Calendar IMPORTS---------------
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import Calendar from 'rc-calendar';
//--------------------------------

function Booking(){
    const timePickerElement = <TimePicker defaultValue={moment('00:00:00', 'HH:mm:ss')}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}/>;
    const [barbers, setBarbers] = useState([]);
    const [barberAvailableTimes, setBarberAvailableTimes] = useState();
    const [chosenHairCut, setChosenHairCut] = useState();
    const [chosenBarber, setChosenbarber] = useState();

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

    function disabledHours(){
        return;
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
                timePicker={timePickerElement}
                disabledDate={disabledDate}
                />
            </Form.Group>
            <Form.Group>
            <Button variant="primary" type="submit">
                Book
            </Button>                
            </Form.Group>
        </Form>
        </Row>
        </>
    )
}

export default Booking;