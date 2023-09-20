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
  const listing = useSelector(state => state.listings[listingId]);
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
  const cleaningFee = numNights > 0 ? listing.nightPrice * 0.50 : 0;
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

    debugger
    
    if (validateDates()) {
        const reservationData = {
            reservation: {
                listingId: listing.id,
                numGuests,
                totalPrice: total,
                startDate: format(startDate, "yyyy-MM-dd"),
                endDate: format(endDate, "yyyy-MM-dd"),
            }
        };

        debugger 
        
        try {
            await new Promise((resolve, reject) => {
                dispatch(createReservation(reservationData)).then(resolve).catch(reject);
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
            } else if (data) {
                setErrors([data]);
            } else {
                setErrors([res.statusText]);
            }
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
  }, [startDate, endDate, nightPrice, cleaningFee]);

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
                ${(nightPrice * numNights).toFixed(2)}
              </div>
            </div>
            <div className="breakdown-item">
                <div className="breakdown-label">
                  Service Fee
                </div>
                <div className="breakdown-price">
                  ${serviceFee}
                </div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-label">Cleaning fee</div>
                <div className="breakdown-price">${cleaningFee.toFixed(2)}</div>
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
        {typeof error === 'object' ? JSON.stringify(error) : error}
    </div>
))}

        </div>
      )}
      {calendarOpen && (
  <div className="calendar-container">
    <Calendar
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      setCalendarOpen={setCalendarOpen}
      blockedDates={blockedDates}
    />
  </div>
      )}
    </>
  );
};

export default ReservationForm;

