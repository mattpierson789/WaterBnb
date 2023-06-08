import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation } from "../../store/reservations";
import { useParams, Link } from 'react-router-dom';
import { format, subDays, isValid } from 'date-fns';

const handleInvalidDate = (date) => {
  const parsedDate = new Date(date);
  return isValid(parsedDate) ? parsedDate : new Date();
};

const UpcomingReservationItem = (props) => {
  const reservation = props.reservation;
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(deleteReservation(reservation.id));
  }

  const startDate = handleInvalidDate(reservation.start_date);
  const endDate = handleInvalidDate(reservation.end_date);

  if (reservation.id)
    return (
      <div>
        <h3></h3>
        <div>
          <h3>{reservation.listingCity}</h3>
          <p>{reservation.listingtitle}</p>
          <div id='solid-line'></div>
          <p>
            {format(startDate, 'yyyy-MM-dd')} - {format(endDate, 'yyyy-MM-dd')}
          </p>
          <div id='vertical-line'></div>
          <Link to={`trips/${reservation.id}#edit`}>
            <button className='cancel-reservation-button'>Change Reservation</button>
          </Link>
          <br/><br/>
          <button className='cancel-reservation-button' onClick={handleClick}>Cancel Reservation</button>
          <br/>

          <br/><br/>
        </div>
      </div>
    );
}

export default UpcomingReservationItem;
 