import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListing } from '../../store/listings';
import { useDispatch } from 'react-redux';

const ReservationForm = () => {

    const currentDate = new Date();

    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate + 5);
    const [guests, setGuests] = useState(1);
    const { listingId } = useParams();      // why better to do userparams vs a prop?
    const listing = useSelector(getListing(listingId))
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    // calculate price for a reservation 


    // How do I store the avialbilty for a listing? 



    // handle the submission of a reservation, which if available will create the reservation
    // needs to be blocked if not logged in 

    // if (session.user) {

    const handleSubmit = (e) => {
        e.preventDefault();
       
    }

    return (
        <div>
            {/* Pull price and overall rating from listing */}
            
            {/* Create a form for check-in/check-out that includes guests and ends with a reserve button */}
            
            {/* Render calculated price dynamically for guests and nights */}
            
            {/* Add in cleaning fee */}
            
            {/* Add in service fee dynamically */}
            
            {/* List total before taxes */}

            <h2> Reservation Form Placeholder </h2>
        </div>
    );

    // } else {

// if not logged in, render a login modal

    // }
}

export default ReservationForm;
