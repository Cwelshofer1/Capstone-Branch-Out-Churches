import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"


export const NavBar = ({currentUser}) => {
   

   
 
const navigate = useNavigate()

return (
    
<nav className="navbar-container">

    <ul className="navbar-list">
        
        <Link onClick={() => window.scrollTo(0, 0)} to="/all-events"><li>All Events</li></Link>
        <Link onClick={() => window.scrollTo(0, 0)} to={`/my-events/${currentUser.id}`}><li>My Events</li></Link>
        <Link onClick={() => window.scrollTo(0, 0)} to="/new-event"><li>New Event</li></Link>
        <Link onClick={() => window.scrollTo(0, 0)} to="/all-churches"><li className="allchurches">All Churches</li></Link>
        <Link onClick={() => window.scrollTo(0, 0)} to="/new-church"><li>New Church</li></Link>
        <Link onClick={() => window.scrollTo(0, 0)} to={`/profile/${currentUser.id}`}><li className="profile">Profile</li></Link>
     
        
        {localStorage.getItem("church_user") ? (
            
            <Link
            to=""
            onClick={() => {
                localStorage.removeItem("church_user")
                navigate("/login", { replace: true})
            }}
            >
                <li className="logout">Logout</li>
            </Link>
        ) : (
            ""
            
        )}
    </ul>
</nav>

 )

}
