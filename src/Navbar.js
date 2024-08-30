import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css'

export default function Navbar(){
    return(
        <div className="navbar-main">
            <div className="navItem">
                <Link to="/" className='navLink'>PROFILE LIST</Link>
            </div>
            <div className='navItem'>
                <Link to="/DetailedView" className='navLink'>DETAILED VIEW</Link>
            </div>
        </div>
    )
}