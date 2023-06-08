import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../store/reservations';
import moment from 'moment';
import UpcomingReservationItem from './UpcomingReservationItem';
import PastReservationItem from './PastReservationItem';
import './ReservationShowPage.css';
import StarRating from '../StarRating';

export const ReservationsShowPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const reservationsSelector = (state) =>
    state.reservations ? Object.values(state.reservations) : [];

  const reservations = useSelector(reservationsSelector);

  const reservationsFilter = () => {
    const past = [];
    const upcoming = [];

    if (reservations) {
      const currentDate = new Date();

      reservations.forEach((reservation) => {
        const endDate = new Date(reservation.endDate);

        if (endDate instanceof Date && !isNaN(endDate)) {
          if (endDate < currentDate) {
            past.push(reservation);
            console.log(reservation)
          } else {
            upcoming.push(reservation);
          }
        } else {
          console.log('Invalid endDate:', reservation.endDate);
        }
      });
    }

console.log(past)
console.log(upcoming)
    return { past, upcoming };
   
  };

  const { past, upcoming } = reservationsFilter();


  return (
    <div id='my_trips-container'>
      <h1>Upcoming Trips</h1>
      <div id='upcoming-trips-container'>
        <ul id='upcoming-trips'>
          {upcoming.map((reservation) => (
            <UpcomingReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </div>
      <h1>Past Trips</h1>
      <div id='past-trips-container'>
        <ul>
          {past.map((reservation) => (
            <PastReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationsShowPage;
