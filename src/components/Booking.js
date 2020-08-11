import React, { useState, useEffect } from 'react';
import styles from './Booking.module.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import apis from '../api';
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLibs";
//Calendar IMPORTS---------------
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import Calendar from 'rc-calendar';
//--------------------------------

function Booking(props){
    console.log(localStorage.getItem('userSession'));
    const { setBookingConfirmed } = useAppContext(); 
    const [barbers, setBarbers] = useState([]);
    const [barberAvailableTimes, setBarberAvailableTimes] = useState([]);
    const [chosenHairCut, setChosenHairCut] = useState();
    const [chosenBarber, setChosenbarber] = useState();
    const [chosenDate, setChosenDate] = useState();
    const [timeSlotsToDisplay, setTimeSlotToDisplay] = useState([]);
    const [customerInfo, setCustomerInfo] = useState();
    const [barberObject, setBarberObject] = useState();

    let history = useHistory();

    useEffect(() => {
        setCustomerInfo(props.customerInfo)
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

    function handleDateChoice(event, props){
        try{
        const formattedDateArray = event._d.toString().split(" ");
        const dayName = formattedDateArray[0];
        const month = formattedDateArray[1];
        const dayNum = formattedDateArray[2];
        const year = formattedDateArray[3];
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

    function convertMonth(month){
        switch(month){
            case "Jan":
                return "01"
            case "Feb":
                return "02"
            case "Mar":
                return "03"
            case "Apr":
                return "04"
            case "May": 
                return "05"
            case "Jun":
                return "06"
            case "Jul":
                return "07"
            case "Aug":
                return "08"
            case "Sep":
                return "09"
            case "Oct":
                return "10"
            case "Nov":
                return "11"
            case "Dec":
                return "12"
            default:
                break;
        }
    }

    function handleDateHighlight(value){
        const date = value._d.toString().split(" ");
        const dateNumber = date[2]
        const monthNumber = convertMonth(date[1]);
        let isAvailable = false;
        for(let i = 0; i <= barberAvailableTimes.length - 1; i++){
            if(dateNumber === barberAvailableTimes[i].start.day && monthNumber === barberAvailableTimes[i].start.month){
                isAvailable = true;
            }
        }
        return isAvailable ? <div className="rc-calendar-date" style={{backgroundColor: 'green', textAlign: 'center', color: 'white'}}>{dateNumber}</div>
        :<div className="rc-calendar-date">{dateNumber}</div>
    }

    async function findChosenBarber(chosenBarber){
        const stringBarber = chosenBarber.split(" ");
        const firstNameBarber = stringBarber[0]
        const lastNameBarber = stringBarber[1]
        const foundBarber = barbers.find(barber => barber.firstName === firstNameBarber && barber.lastName === lastNameBarber);
        const barberID = foundBarber._id;
        await apis.getBarberByID(barberID).then(res => { 
            setBarberAvailableTimes(res.data.data.availableTimes);
            setBarberObject(res.data.data);
        }
            ).catch(error => {
                console.log(error);
            })
    }

    async function handleCreateBooking(e, props){
        e.preventDefault();
        let customer = {}
        let barber = {}
        await apis.getCustomerByEmail(customerInfo["email"]).then(res => {
            customer = res.data.data;
        }
        )
        
        const barberID = barberObject._id;
        await apis.getBarberByID(barberID).then(res => { 
            barber = res.data.data;
        }
        )

        const timeStart = {
            year : props.date.start.year,
            month : props.date.start.month, 
            day : props.date.start.day, 
            time : props.date.start.time
        }

        const appointmentObject = {
            "customer": customer,
            "barber": barber,
            "service": chosenHairCut,
            "startTime": timeStart
        }

        setBookingConfirmed(appointmentObject);


        await apis.createAppointment(appointmentObject).then( res => {
        }
        )

        history.push("/booking-confirmation");
    }

    function Appointment(props){
        return (
            <Alert variant="info" className={styles.appointmentStyle}>
            <Alert.Heading>Available Appointment:</Alert.Heading>
            <hr />
            <p>
            Date and time: <strong>{props.date.start.day}/{props.date.start.month}/{props.date.start.year} at {props.date.start.time}</strong>
            <br/>
            Barber: <strong>{chosenBarber}</strong>
            <br/>
            Service: <strong>{chosenHairCut}</strong>
            </p>
            <Button className={styles.signUpButton} variant="outline-dark" type="submit" onClick={(e) => handleCreateBooking(e, props)}>
                Book
            </Button> 
            </Alert>
        );
    }
    
    return(
        <>
        <Row className={styles.mainRow}>
        <Form className={styles.formContainer}>
            <h2 style={{textAlign: "center", paddingBottom: "10px", borderWidth: '3px', borderColor: 'grey'}}>Your Booking</h2>
            <Form.Group name="haircut" className={styles.stepContainer}>
                <Form.Label ><strong>Choose your haircut:</strong></Form.Label>
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Male Haircut (20 min)"} type="radio" label="Male Haircut (20 min)" value="Male Haircut (20 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Male Haircut + Shampoo (30 min)"} type="radio" label="Male Haircut + Shampoo (30 min)" value="Male Haircut + Shampoo (30 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Female Haircut (30 min)"} type="radio" label="Female Haircut (30 min)" value="Female Haircut (30 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Female Haircut + Shampoo (40 min)"} type="radio" label="Female Haircut + Shampoo (40 min)" value="Female Haircut + Shampoo (40 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Male Color (120 min)"} type="radio" label="Male Color (120 min)" value="Male Color (120 min)"  />
                <Form.Check onClick={handleHairCutChoice} name="haircut" key={"Female Color (120 min)"} type="radio" label="Female Color (120 min)" value="Female Color (120 min)"   />
            </Form.Group>
            <Form.Group className={styles.stepContainer}>
                <Form.Label ><strong>Pick a barber:</strong></Form.Label>
                <Form.Control className={styles.inputElement} as="select" custom onChange={handleBarberChoice}>
                    {barbers.map((barber) => (
                        <option>{barber.firstName} {barber.lastName}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className={styles.stepContainer}>
                <Form.Label ><strong>Pick a date:</strong></Form.Label>
                <Calendar
                style={{width: '100%'}}
                disabledDate={disabledDate}
                onSelect={handleDateChoice}
                dateRender={handleDateHighlight}
                />
            </Form.Group>
            <Form.Group className={styles.stepContainer}>
                <Form.Label ><strong>Pick an Appointment:</strong></Form.Label>
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