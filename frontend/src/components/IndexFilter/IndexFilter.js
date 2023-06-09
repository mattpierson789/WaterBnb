import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchListings } from "../../store/listings"
import { fetchListingsType } from "../../store/listings"
import {fetchListingsActivity} from "../../store/listings"
import './IndexFilter.css' 

export const IndexFilter = () => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState('all')

    return (
        <div className="filter-bar">


            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Ocean')); setSelected('Ocean')}} style={selected === 'Ocean' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/ocean-3+(1).png'></img>
                <p>Ocean</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Lake')); setSelected('Lake')}} style={selected === 'Lake' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/lake-PhotoRoom.png'></img>
                <p>Lake</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('River')); setSelected('River')}} style={selected === 'River' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/Screen+Shot+2023-06-08+at+5.01.15+PM.png'></img>
                <p>River</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Island')); setSelected('Island')}} style={selected === 'Island' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/islands-PhotoRoom.png'></img>
                <p>Island</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Sea')); setSelected('Sea')}} style={selected === 'Sea' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/sea-3.png'></img>
                <p>Sea</p>
            </div>


            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Mountains')); setSelected('Mountains')}} style={selected === 'Mountains' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/mountains-PhotoRoom.png'></img>
                <p>Mountains</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('Surfing')); setSelected('Surfing')}} style={selected === 'Surfing' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/surfing-PhotoRoom.png'></img>
                <p>Surfing</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('Swimming')); setSelected('Swimming')}} style={selected === 'Swimming' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Swimming</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('Skiing')); setSelected('Skiing')}} style={selected === 'Skiing' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/skiing-PhotoRoom.png'></img>
                <p>Skiing</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('Fishing')); setSelected('Fishing')}} style={selected === 'Fishing' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/Screen+Shot+2023-06-08+at+5.03.27+PM.png'></img>
                <p>Fishing</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('National Park')); setSelected('National Park')}} style={selected === 'National Park' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/national_park-PhotoRoom.png'></img>
                <p>National Park</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('Top Rated')); setSelected('Top Rated')}} style={selected === 'Top Rated' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/Screen+Shot+2023-06-08+at+4.59.02+PM.png'></img>
                <p>Top Rated</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('')); setSelected('')}} style={selected === '' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/Screen+Shot+2023-06-08+at+4.59.10+PM.png'></img>
                <p>Random</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsActivity('Pets Allowed')); setSelected('Pets Allowed')}} style={selected === 'Pets Allowed' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://mp-waterbnb-seeds.s3.amazonaws.com/Index+Filters/pets.png'></img>
                <p>Pets Allowed</p>
            </div>

            </div>

)}