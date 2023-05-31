import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchListings } from "../../store/listings"
import { fetchListingsType } from "../../store/listings"
import './IndexFilter.css' 

export const IndexFilter = () => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState('all')

    return (
        <div className="filter-bar">


            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Ocean')); setSelected('Ocean')}} style={selected === 'Ocean' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Ocean</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Lake')); setSelected('Lake')}} style={selected === 'Lake' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Lake</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('River')); setSelected('River')}} style={selected === 'River' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>River</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Island')); setSelected('Island')}} style={selected === 'Island' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Island</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Sea')); setSelected('Sea')}} style={selected === 'Sea' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Sea</p>
            </div>


            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Mountains')); setSelected('Mountains')}} style={selected === 'Mountains' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Mountains</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Surfing')); setSelected('Surfing')}} style={selected === 'Surfing' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Surfing</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Swimming')); setSelected('Swimming')}} style={selected === 'Swimming' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Swimming</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Skiing')); setSelected('Skiing')}} style={selected === 'Skiing' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Skiing</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('Fishing')); setSelected('Fishing')}} style={selected === 'Fishing' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Fishing</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('National Park')); setSelected('National Park')}} style={selected === 'National Park' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>National Park</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('National Park')); setSelected('National Park')}} style={selected === 'National Park' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Top Rated</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('National Park')); setSelected('National Park')}} style={selected === 'National Park' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Random</p>
            </div>

            <div className="filter-button" onClick={() => {dispatch(fetchListingsType('National Park')); setSelected('National Park')}} style={selected === 'National Park' ? { borderBottom: '2px solid #222222' } : {}}>
                <img className="filter-image" alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png'></img>
                <p>Pets Allowed</p>
            </div>

            </div>

)}