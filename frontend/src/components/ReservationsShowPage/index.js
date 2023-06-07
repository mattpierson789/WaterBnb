// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getReservations, fetchReservations } from '../../store/reservations'
// import { PastReservationItem } from './PastReservationItem'
// import { UpcomingReservationItem } from './UpcomingReservationItem'
// import moment from 'moment'

// export const ReservationsShowPage = () => {
//   const user = useSelector(state => state.session.user)
//   const dispatch = useDispatch()

//   const getReservationsSelector = (state) => {
//     return state.listings.reservations ? Object.values(state.listings.reservations) : null
//   }

//   let reservations = useSelector(getReservationsSelector)

//   useEffect(() => {
//     dispatch(fetchReservations(user.id))
//   }, [])

//   const reservationsFilter = () => {
//     const past = []
//     const upcoming = []

//     reservations.forEach(reservation => {
//       if (moment(reservation.end_date).isBefore(moment())) {
//         past.push(reservation)
//       } else {
//         upcoming.push(reservation)
//       }
//     })

//     return { past, upcoming }
//   }

//   const { past, upcoming } = reservationsFilter()

//   return (


//     <div id='my_trips-container'>
//       <h1>Upcoming Trips</h1>
//       <div id='upcoming-trips-container'>
//         <ul id='upcoming-trips'>
       
//           {upcoming.map(reservation => (
//             <UpcomingReservationItem key={reservation.id} reservation={reservation} />
//           ))}
//         </ul>
//       </div>
//       <h1>Past Trips</h1>
//       <ul id='past-trips-container'>
  
//         {past.map(reservation => (
//           <PastReservationItem key={reservation.id} reservation={reservation} />
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default ReservationsShowPage
