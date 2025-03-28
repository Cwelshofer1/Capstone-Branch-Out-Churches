import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllUsers } from "../services/userService"
import { deleteUser } from "../services/userService"
import { getAllUsersById } from "../services/userService"
import "./Profile.css"
import { getAllEvents } from "../services/EventService"
import { deleteEvent } from "../services/EventService"
import { getAllChurches } from "../services/ChurchService"
import { deleteChurch } from "../services/ChurchService"


export const UserButtons = ({ currentUser, usersObject }) => {

    const [allUsers, setAllUsers] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    

    useEffect(() => {
   getAllUsersById(id).then((data) => {
        const userObj = data[0]
        setAllUsers(userObj)
    })
}, [id])
   
    const handleDelete = () => {
      if(window.confirm("Are you sure you want to delete your profile?")){
        getAllEvents().then(events => {
          const userEvents = events.filter(event => event.userId === usersObject.id)
          const deleteEventPromises = userEvents.map(event => deleteEvent(event.id))
        getAllChurches().then(churchs => {
          const userChurches = churchs.filter(church => church.creatorUserId === usersObject.id)
          const deleteUserChurches = userChurches.map(church => deleteChurch(church.id))
       
  
          Promise.all(deleteEventPromises, deleteUserChurches)
          .then(() => {
            deleteUser(usersObject.id)
            .then(() => {
              localStorage.removeItem("church-user")
              navigate("/login")
            })
          })
        })
        })
      }
      }


            return (
                    <div>
                        {currentUser?.id === usersObject.id ? (
                            <div className="profile-button">

                             <button 
                              onClick={handleDelete}
                            className="profile-buttons">
                                Delete
                             </button>
                            <Link onClick={() => window.scrollTo(0, 0)} to={`/profile/edit/${usersObject.id}`} >
                              <button 
                              className="profile-buttons" >
                                  Edit
                               </button>
                               </Link>
                             </div> 

                        ) : (
                           <div></div>
                            )}
                    
                          </div>
                        );
                    }