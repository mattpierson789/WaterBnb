import React from "react"
import { useDispatch } from 'react-redux'
import { deleteReservation } from "../../store/reservations"
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getListing } from '../../store/listings'
import { updateReservation } from '../../store/reservations'
import { format, subDays, addDays } from 'date-fns'

const ReservationIndexItem = (props) => {
  const reservation = props.reservation
  const listing = reservation.listing
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)


  const handleClick = (e) => {
    e.preventDefault()
    dispatch(deleteReservation(reservation.id))
  }

  const startDate = new Date(reservation.start_date)
  const endDate = new Date(reservation.end_date)

  return (
    reservation.id ? (
      
   
  )
}

export default ReservationIndexItem


