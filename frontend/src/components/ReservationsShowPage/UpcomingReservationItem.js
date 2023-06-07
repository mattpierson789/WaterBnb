import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation } from "../../store/reservations";
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListing } from '../../store/listings';
import { updateReservation } from '../../store/reservations';
import { format, subDays, addDays } from 'date-fns';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



const ReservationIndexItem = (props) => {
  const reservation = props.reservation;
  const listing = reservation.listing;
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteReservation(reservation.id));
  }

  const startDate = new Date(reservation.start_date);
  const endDate = new Date(reservation.end_date);

 if (reservation.id) 

  return (
    <div>
      <h3>Upcoming Trips!</h3>
      <div>
        <h3>{reservation.listing.city}</h3>
        <p>{reservation.listing.title}</p>
        <div id='solid-line'></div>
        <p>
          {reservation.start_date} - {reservation.end_date}
        </p>
        <div id='vertical-line'></div>
        <Link to={`trips/${reservation.id}#edit`}>
          <button className='cancel-reservation-button'>Change Reservation</button>
        </Link>
        <br/><br/>
        <button className='cancel-reservation-button' onClick={handleClick}>Cancel Reservation</button>
        <br/>
        <span className='small-text'>Free cancellation until {format(subDays(startDate, 7), 'MMM d')}</span>
        <br/><br/>
      </div>
    </div>
  )
}

export default ReservationIndexItem;
