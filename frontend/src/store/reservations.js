import csrfFetch from "./csrf";

export const RECEIVE_RESERVATIONS = 'listings/receiveListings';
export const RECEIVE_RESERVATION = 'listings/receiveListing';
export const RECEIVE_RESERVATION_DETAILS = 'listings/RECEIVE_RESERVATION_DETAILS';

export const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations,
});

export const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  reservation,
});

export const receiveReservationDetails = (reservation) => ({
  type: RECEIVE_RESERVATION_DETAILS,
  reservation,
});

export const getReservations = (state) => state.reservations ? Object.values(state.reservations) : [];

export const getReservation = (reservationId) => (state) => state.reservation ? state.reservation[reservationId] : null;

export const fetchReservations = () => async (dispatch) => {
  const res = await csrfFetch('/api/reservations');
  const data = await res.json();
  dispatch(receiveReservations(data.reservations));
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await fetch(`/api/reservations/${reservationId}`);
  const data = await res.json();
  dispatch(receiveReservation(data.reservation));
};

const reservationsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      return action.reservations;

    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation;
      return newState;

    case RECEIVE_RESERVATION_DETAILS:
      const newReservationStuff = action.reservation ? action.reservation : null;
      return { ...newState, ...newReservationStuff };

    default:
      return newState;
  }
};

export default reservationsReducer;
