import csrfFetch from "./csrf";

export const RECEIVE_RESERVATIONS = 'listings/receiveListings';
export const RECEIVE_RESERVATION = 'listings/receiveListing';
export const REMOVE_RESERVATION = 'listings/removeReservation';

export const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations,
});

export const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  reservation,
});

export const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION, 
  reservationId
})

export const getReservations = (state) => state.reservations ? Object.values(state.reservations) : [];

export const getReservation = (reservationId) => (state) => state.reservation ? state.reservation[reservationId] : null;

export const fetchReservations = () => async (dispatch) => {
  const res = await csrfFetch('/api/reservations');
  const data = await res.json();
  dispatch(receiveReservations(data.reservations));
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`);
  const data = await res.json();
  dispatch(receiveReservation(data.reservation));
};

export const createReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations`, {
    method: 'POST', 
    body: JSON.stringify(reservation),
    headers: { 'Content-Type': 'application/json'}
  })

  const data = await res.json();
  dispatch(receiveReservation(data))
}

export const updateReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: 'PATCH', 
    body: JSON.stringify(reservation),
    headers: { 'Content-Type': 'application/json'}
  })

  const data = await res.json();
  dispatch(receiveReservation(data))
}

export const deleteReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`, {
    method: 'DELETE', 
  })

  if (res.ok) {
    dispatch(removeReservation(reservationId));
  }
}

const reservationsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      return action.reservations;

    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation;
      return newState;

    case REMOVE_RESERVATION:
      delete newState[action.reservationId]
      return newState

    default:
      return newState;
  }
};

export default reservationsReducer;
