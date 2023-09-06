import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { getListing } from '../../store/listings';
import './ReservationForm.css';
import {createReservation} from '../../store/reservations'
import format from 'date-fns/format';


const ReservationForm = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));
  const currentUser = useSelector(state => state.session.user);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, 'day'));
  const [numGuests, setNumGuests] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [serviceFee, setServiceFee] = useState(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [errors, setErrors] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  

  useEffect(() => {
    setNumGuests(adults + children);
  }, [adults, children]);

  const numDays = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    return end.diff(start, 'days');
  };

  const openMenu = () => {

    if (showMenu) return;
    setShowMenu(true);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

  let reserver_id
 
  if(currentUser){
      reserver_id = currentUser.id

      // debugger
      
  } else {
      reserver_id = null 
  }

    const price = listing.nightPrice * numDays() + listing.nightPrice*.1 + Math.floor(numDays() * listing.nightPrice / 7)
    
    // const reservation = { listing_id, reserver_id, num_guests, start_date, end_date};

    const reservation = {
      reservation: {
        listingId: listingId,
        reserver_id: reserver_id,
        numGuests: numGuests,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      }
    };
    


    
return dispatch(createReservation(reservation))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };
  

  // if (currentUser) {
  return (
    <form id="reservation-form" className="reservation-form" onSubmit={handleSubmit}>
      <ul className="list-container">
        <ul className="inner-list">
          <div className="booking-info">
            <div className="price-no-wrap">${listing.nightPrice} <span id= "night"> night </span></div>
          </div>
        </ul>
    
        <div className="date-picker-container">
  <div className="date-picker-wrapper">
    <div className="start-date-div">
      <div id='title-wrapper'>
      <h4 className="title">Check-In</h4>
      <h4 className="title checkout">Checkout</h4>
      </div>
      <DateRangePicker
        startDate={startDate}
        startDateId="start-date"
        startDatePlaceholderText="Check-In"
        endDate={endDate}
        endDateId="end-date"
        endDatePlaceholderText="Checkout"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        small={true}
        noBorder={true}
        hideKeyboardShortcutsPanel
      />
    </div>
    <div className="end-date-div">
     
    </div>
  </div>
</div>

        <div className="guests-container" onClick={openMenu}>
          <div id='guests-title-wrapper'>
        <h4 className="guests-title">Guests</h4>
          <div className="guests-info">
            <p className="label"></p>
            <p className="count">{numGuests === 1 ? '1' : `${numGuests}`}</p>
          </div>
          <i className={`fa-sharp fa-solid ${showMenu ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        </div>


        <ul className="error-list">
          {errors.map((error, index) => <li key={index} className="error">{error}</li>)}
        </ul>


        {/* <p className="charge-info">No charges will be made yet</p> */}
        <div className="price-details">
        <div className="detail">
        <p className="label">${`${listing.nightPrice} X ${numDays()}`}</p>
          <p className="listing-price-value">${listing.nightPrice * numDays()}</p>
        </div>

        <div className="detail">
          <p className="label">Cleaning Fee</p>
          <p className="cleaning-fee-value">${listing.nightPrice*.3 }</p>
        </div>

        <div className="detail">
          <p className="label">Service Fee</p>
          <p className="service-fee-value">${Math.floor(numDays() * listing.nightPrice / 7)}</p>
        </div>

        <div id='break'></div>

        <div className="total">
          <p className="label-total">Total before taxes</p>
          <p className="total-value">${listing.nightPrice * numDays() + listing.nightPrice*.1 + Math.floor(numDays() * listing.nightPrice / 7)}</p>
        </div>
      </div>

        {/* {price details } */}


        {showMenu && (


          <div className="guests-dropdown">
            <div className="guest-type">
              <div>
                <h4 className="title">Adults</h4>
                <p className="age-range">Ages 13+</p>
              </div>


              <div className="guest-count">
                <button type="button" disabled={adults === 1} onClick={() => setAdults(adults - 1)}>-</button>
                <p className="count">{adults}</p>
                <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>


            <div className="guest-type">
              <div>
                <h4 className="title">Children</h4>
                <p className="age-range">Ages 2-12</p>
              </div>


              <div className="guest-count">
                <button type="button" disabled={children === 0} onClick={() => setChildren(children - 1)}>-</button>
                <p className="count">{children}</p>
                <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>
            <button className="close-button" type="button" onClick={() => setShowMenu(false)}>Close</button>
          </div>


        )}
        <button className="reserve-button" type="submit">Reserve</button>
        </ul>
      </form>
    );
//   } else {
//     return (
//       <div id="reservation-form" className="res-login-notice">
//         <h3>Please login to reserve today!</h3>
//       </div>
//     )
//   }
};


export default ReservationForm;
