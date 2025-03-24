import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

export const NavBar = ({currentUser}) => {
   

   
 
const navigate = useNavigate()

return (
    
<div className="navbar-container">

    <ul className="navbar-list">
        
        <Link to="/all-events"><li>All Events</li></Link>
        <Link to="/new-event"><li>New Event</li></Link>
        <Link to="/all-churches"><li>All Churches</li></Link>
        <Link to="/new-church"><li>New Church</li></Link>
        <Link to={`/profile/${currentUser.id}`}><li>Profile</li></Link>
     
        
        {localStorage.getItem("church_user") ? (
            <Link
            to=""
            onClick={() => {
                localStorage.removeItem("church_user")
                navigate("/login", { replace: true})
            }}
            >
                <li>Logout</li>
            </Link>
        ) : (
            ""
            
        )}
    </ul>
</div>

 )

}
