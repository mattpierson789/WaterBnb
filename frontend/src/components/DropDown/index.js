// import { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navigation from '../Navigation';
// import "./DropDown.css";
// import { useSelector } from 'react-redux';

// function DropDownMenu() {
//     const [menuDisplay, setMenuDisplay] = useState('none');
//     const user = useSelector(state => state.session.user);

//     const toggleMenuDisplay = (e) => {
//         setMenuDisplay(menuDisplay === 'none' ? 'block' : 'none');
//         e.stopPropagation()
//     }

//     return (
//         <div>
//             <div className='dropdown-button' onClick={toggleMenuDisplay}>
//                 <img id='hamburger' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" />
//                 <img id='profile-dropdown-pic' src={user ? user.profilePic : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />
//             </div>
//             <div className='dropdown-menu' onClick={toggleMenuDisplay} style={{display: menuDisplay}}>
//                 <div id="modal2-background" />
//                 <Navigation />
//             </div>
//         </div>
//     )
// }

// export default DropDownMenu;

// useeffect here to conditionally return nothing if menu display is false 
// add eventlistener to the window 
