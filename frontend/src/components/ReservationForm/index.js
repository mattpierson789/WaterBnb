import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { getListing } from '../../store/listings';
import './ReservationForm.css';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));
  const user = useSelector(state => state.session.user);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, 'day'));
  const [numGuests, setNumGuests] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [errors, setErrors] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  const openMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  useEffect(() => {
    setNumGuests(adults + children);
  }, [adults, children]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const reservation = { listingId, userId: user?.id, numGuests, startDate, endDate };

    // Dispatch action to create reservation
    // ...

    // Handle error response
    // ...
  };

  const numDays = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    return end.diff(start, 'days');
  };

//   if (user) {
    return (
      <form id="reservation-form" className="reservation-form" onSubmit={handleSubmit}>
        <div className="booking-info">
          <h3 className="price">${listing.night_price} per night</h3>
        </div>
        <div className="date-picker-container">
          <div className="date-picker-wrapper">
            <h4 className="title">Check-In</h4>
            <h4 className="title checkout">Checkout</h4>
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
        </div>
        <div className="guests-container" onClick={openMenu}>
          <div className="guests-info">
            <p className="label">Guests</p>
            <p className="count">{numGuests === 1 ? '1 guest' : `${numGuests} guests`}</p>
          </div>
          <i className={`fa-sharp fa-solid ${showMenu ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        <ul className="error-list">
          {errors.map((error, index) => <li key={index} className="error">{error}</li>)}
        </ul>
        <p className="charge-info">No charges will be made yet</p>
        <div className="price-details">
          <div className="detail">
            <p className="label">Total</p>
            <p className="value">${listing.price * numDays()}</p>
          </div>
          <div className="detail">
            <p className="label">Cleaning Fee</p>
            <p className="value">${listing.cleaningFee}</p>
          </div>
          <div className="detail">
            <p className="label">Service Fee</p>
            <p className="value">${Math.floor(numDays() * listing.price / 7)}</p>
          </div>
          <div className="total">
            <p className="label">Total before taxes</p>
            <p className="value">${Math.floor(numDays() * listing.price / 7) + listing.cleaningFee}</p>
          </div>
        </div>
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
