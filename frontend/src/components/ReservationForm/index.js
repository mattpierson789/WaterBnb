// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import moment from 'moment';
// import { DateRangePicker } from 'react-dates';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
// import { getListing } from '../../store/listings';
// import './ReservationForm.css';
// import {createReservation} from '../../store/reservations'
// import format from 'date-fns/format';


// const ReservationForm = () => {
//   const dispatch = useDispatch();
//   const { listingId } = useParams();
//   const listing = useSelector(getListing(listingId));
//   const currentUser = useSelector(state => state.session.user);

//   const [startDate, setStartDate] = useState(moment());
//   const [endDate, setEndDate] = useState(moment().add(1, 'day'));
//   const [numGuests, setNumGuests] = useState(1);
//   const [showMenu, setShowMenu] = useState(false);
//   const [serviceFee, setServiceFee] = useState(0);
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [errors, setErrors] = useState([]);
//   const [focusedInput, setFocusedInput] = useState(null);

  

//   useEffect(() => {
//     setNumGuests(adults + children);
//   }, [adults, children]);

//   const numDays = () => {
//     const start = moment(startDate);
//     const end = moment(endDate);
//     return end.diff(start, 'days');
//   };

//   const openMenu = () => {

//     if (showMenu) return;
//     setShowMenu(true);

//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//   let reserver_id
 
//   if(currentUser){
//       reserver_id = currentUser.id

//       // debugger
      
//   } else {
//       reserver_id = null 
//   }

//     const price = listing.nightPrice * numDays() + listing.nightPrice*.1 + Math.floor(numDays() * listing.nightPrice / 7)
    
//     // const reservation = { listing_id, reserver_id, num_guests, start_date, end_date};

//     const reservation = {
//       reservation: {
//         listingId: listingId,
//         reserver_id: reserver_id,
//         numGuests: numGuests,
//         startDate: startDate.format('YYYY-MM-DD'),
//         endDate: endDate.format('YYYY-MM-DD'),
//       }
//     };
    


    
// return dispatch(createReservation(reservation))
//     .catch(async (res) => {
//       const data = await res.json();
//       if (data && data.errors) setErrors(data.errors);
//     });
//   };
  

//   // if (currentUser) {
//   return (
//     <form id="reservation-form" className="reservation-form" onSubmit={handleSubmit}>
//       <ul className="list-container">
//         <ul className="inner-list">
//           <div className="booking-info">
//             <div className="price-no-wrap">${listing.nightPrice} <span id= "night"> night </span></div>
//           </div>
//         </ul>
    
//         <div className="date-picker-container">
//   <div className="date-picker-wrapper">
//     <div className="start-date-div">
//       <div id='title-wrapper'>
//       <h4 className="title">Check-In</h4>
//       <h4 className="title checkout">Checkout</h4>
//       </div>
//       <DateRangePicker
//         startDate={startDate}
//         startDateId="start-date"
//         startDatePlaceholderText="Check-In"
//         endDate={endDate}
//         endDateId="end-date"
//         endDatePlaceholderText="Checkout"
//         onDatesChange={({ startDate, endDate }) => {
//           setStartDate(startDate);
//           setEndDate(endDate);
//         }}
//         focusedInput={focusedInput}
//         onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
//         small={true}
//         noBorder={true}
//         hideKeyboardShortcutsPanel
//       />
//     </div>
//     <div className="end-date-div">
     
//     </div>
//   </div>
// </div>

//         <div className="guests-container" onClick={openMenu}>
//           <div id='guests-title-wrapper'>
//         <h4 className="guests-title">Guests</h4>
//           <div className="guests-info">
//             <p className="label"></p>
//             <p className="count">{numGuests === 1 ? '1' : `${numGuests}`}</p>
//           </div>
//           <i className={`fa-sharp fa-solid ${showMenu ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
//         </div>
//         </div>


//         <ul className="error-list">
//           {errors.map((error, index) => <li key={index} className="error">{error}</li>)}
//         </ul>


//         {/* <p className="charge-info">No charges will be made yet</p> */}
//         <div className="price-details">
//         <div className="detail">
//         <p className="label">${`${listing.nightPrice} X ${numDays()}`}</p>
//           <p className="listing-price-value">${listing.nightPrice * numDays()}</p>
//         </div>

//         <div className="detail">
//           <p className="label">Cleaning Fee</p>
//           <p className="cleaning-fee-value">${listing.nightPrice*.3 }</p>
//         </div>

//         <div className="detail">
//           <p className="label">Service Fee</p>
//           <p className="service-fee-value">${Math.floor(numDays() * listing.nightPrice / 7)}</p>
//         </div>

//         <div id='break'></div>

//         <div className="total">
//           <p className="label-total">Total before taxes</p>
//           <p className="total-value">${listing.nightPrice * numDays() + listing.nightPrice*.1 + Math.floor(numDays() * listing.nightPrice / 7)}</p>
//         </div>
//       </div>

//         {/* {price details } */}


//         {showMenu && (


//           <div className="guests-dropdown">
//             <div className="guest-type">
//               <div>
//                 <h4 className="title">Adults</h4>
//                 <p className="age-range">Ages 13+</p>
//               </div>


//               <div className="guest-count">
//                 <button type="button" disabled={adults === 1} onClick={() => setAdults(adults - 1)}>-</button>
//                 <p className="count">{adults}</p>
//                 <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setAdults(adults + 1)}>+</button>
//               </div>
//             </div>


//             <div className="guest-type">
//               <div>
//                 <h4 className="title">Children</h4>
//                 <p className="age-range">Ages 2-12</p>
//               </div>


//               <div className="guest-count">
//                 <button type="button" disabled={children === 0} onClick={() => setChildren(children - 1)}>-</button>
//                 <p className="count">{children}</p>
//                 <button type="button" disabled={numGuests === listing.maxGuests} onClick={() => setChildren(children + 1)}>+</button>
//               </div>
//             </div>
//             <button className="close-button" type="button" onClick={() => setShowMenu(false)}>Close</button>
//           </div>


//         )}
//         <button className="reserve-button" type="submit">Reserve</button>
//         </ul>
//       </form>
//     );
// //   } else {
// //     return (
// //       <div id="reservation-form" className="res-login-notice">
// //         <h3>Please login to reserve today!</h3>
// //       </div>
// //     )
// //   }
// };


// export default ReservationForm;

import { useModal } from "../../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Calendar/Calendar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getListing } from "../../store/listings";
import "./ReservationForm2.css";
import format from "date-fns/format";
import { createReservation } from "../../store/reservations";
import { differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Star } from "../../assets/images/star.svg";

const ReservationForm = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  calendarOpen,
  setCalendarOpen,
  blockedDates,
}) => {
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));
  const currentUser = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToggleModal } = useModal();
  const [numGuests, setNumGuests] = useState(1);
  const [numNights, setNumNights] = useState(1);
  const [serviceFee, setServiceFee] = useState(0);
  const [errors, setErrors] = useState([]);
  const [total, setTotal] = useState(0);
  const nightPrice = listing.nightPrice;
  const cleaningFee = listing.cleaningFee;
  const [mousePositions, setMousePositions] = useState({
    reserve: { x: 0, y: 0 },
    login: { x: 0, y: 0 },
  });

  const handleMouseMove = (event, element) => {
    const rect = event.target.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((event.clientY - rect.top) / rect.height) * 100;

    setMousePositions((prevMousePositions) => ({
      ...prevMousePositions,
      [element]: { x: mouseX, y: mouseY },
    }));
  };

  const validateDates = () => numNights >= 1;

  const handleReserve = async (e) => {
    e.preventDefault();
    setErrors([]);

    const inputField = document.querySelector(".input-fields");
    const dateField = document.querySelector(".date-fields");
    const checkin = document.querySelector(".check-in-field");
    const checkout = document.querySelector(".check-out-field");
    inputField.classList.remove("date-error");
    dateField.classList.remove("date-error");
    checkin.classList.remove("date-error");
    checkout.classList.remove("date-error");
    if (validateDates()) {
      const reservation = {
        listingId: listing.id,
        numGuests,
        totalPrice: total,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };
      try {
        await new Promise((resolve, reject) => {
          dispatch(createReservation(reservation)).then(resolve).catch(reject);
        });
        navigate("/user/trips");
      } catch (res) {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          setErrors(data.errors);
          inputField.classList.add("date-error");
          dateField.classList.add("date-error");
          checkin.classList.add("date-error");
          checkout.classList.add("date-error");
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    } else {
      setErrors(["Minimum of 1 night required!"]);
      inputField.classList.add("date-error");
      dateField.classList.add("date-error");
      checkin.classList.add("date-error");
      checkout.classList.add("date-error");
    }
  };

  useEffect(() => {
    const calculatedNumNights = differenceInDays(endDate, startDate);
    const calculatedServiceFee = parseFloat(
      nightPrice * calculatedNumNights * 0.17
    ).toFixed(2);
    const calculatedTotal = (
      nightPrice * calculatedNumNights +
      cleaningFee +
      parseFloat(calculatedServiceFee)
    ).toFixed(2);

    setNumNights(calculatedNumNights);
    setServiceFee(calculatedServiceFee);
    setTotal(calculatedTotal);
  }, [startDate, endDate]);

  return (
    <>
      <div className="booking-header">
        <div className="booking-price">
          <h2>${listing.nightPrice}</h2>
          <span>night</span>
        </div>
        <div className="booking-reviews">
          <div className="listing-rating">
            <div className="review-star">
              <Star />
            </div>
            <div className="listing-rating-score">
              {/* {listing.ratings.overallRating} */}
            </div>
          </div>
          <span className="separator">&#x2022;</span>
          <div className="listing-num-reviews">
            <span>{listing.numReviews} reviews</span>
          </div>
        </div>
      </div>
      {!currentUser && (
        <div className="require-login">
          <div>Please Login to make a reservation</div>
          <button
            id="login-btn"
            onClick={() => setToggleModal(true)}
            style={{
              backgroundPosition: `calc((100 - ${mousePositions.login.x}) * 1%) calc((100 - ${mousePositions.login.y}) * 1%)`,
            }}
            onMouseMove={(e) => handleMouseMove(e, "login")}
          >
            Login/Signup
          </button>
        </div>
      )}
      {currentUser && (
        <div className="booking-form">
          <div className="input-fields">
            <div className="date-fields">
              <div
                className="check-in-field"
                onClick={() => setCalendarOpen((prevState) => !prevState)}
              >
                <div className="check-in-tag">CHECK-IN</div>
                <input
                  className="check-in-input"
                  placeholder="MM/DD/YYYY"
                  readOnly={true}
                  value={
                    startDate ? format(startDate, "MM/dd/yyyy") : "Add date"
                  }
                />
              </div>
              <div
                className="check-out-field"
                onClick={() => setCalendarOpen((prevState) => !prevState)}
              >
                <div className="check-out-tag">CHECK-OUT</div>
                <input
                  className="check-out-input"
                  placeholder="MM/DD/YYYY"
                  readOnly={true}
                  value={endDate ? format(endDate, "MM/dd/yyyy") : "Add date"}
                />
              </div>
            </div>
            <div className="guest-fields">
              <div className="guest-tag">GUESTS</div>
              <select
                className="guest-select"
                value={numGuests}
                onChange={(e) => setNumGuests(e.target.value)}
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3 guests</option>
                <option value={4}>4 guests</option>
              </select>
            </div>
            <button
              id="reserve-btn"
              onClick={handleReserve}
              style={{
                backgroundPosition: `calc((100 - ${mousePositions.reserve.x}) * 1%) calc((100 - ${mousePositions.reserve.y}) * 1%)`,
              }}
              onMouseMove={(e) => handleMouseMove(e, "reserve")}
            >
              Reserve
            </button>
          </div>
          <div className="breakdown-container">
            <div className="breakdown-item">
              <div className="breakdown-label">
                ${nightPrice} x {numNights} nights
              </div>
              <div className="breakdown-price">
                {/* ${(nightPrice * numNights).toFixed(2)} */}
              </div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-label">Cleaning fee</div>
              {/* <div className="breakdown-price">${cleaningFee.toFixed(2)}</div> */}
            </div>
            <div className="breakdown-item">
              <div className="breakdown-label">Service fee</div>
              <div className="breakdown-price">${serviceFee}</div>
            </div>
            <div className="breakdown-total">
              <div className="breakdown-label">Total</div>
              <div className="breakdown-price">${total}</div>
            </div>
          </div>
        </div>
      )}
      {errors.length > 0 && (
        <div className="errors-container">
          {errors.map((error, idx) => (
            <div className="error-item" key={idx}>
              {error}
            </div>
          ))}
        </div>
      )}
      {calendarOpen && (
        <Calendar
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setCalendarOpen={setCalendarOpen}
          blockedDates={blockedDates}
        />
      )}
    </>
  );
};

export default ReservationForm;

