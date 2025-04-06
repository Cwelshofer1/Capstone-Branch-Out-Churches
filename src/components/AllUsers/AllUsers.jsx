import { getAllUsers } from "../services/userService"
import { useState, useEffect } from "react"
import { getAllEvents } from "../services/EventService"
import { getAllChurches } from "../services/ChurchService"
import { deleteUser } from "../services/userService"
import { deleteChurch } from "../services/ChurchService"
import { deleteEvent } from "../services/EventService"
import "./allUsers.css"
import { useNavigate } from "react-router-dom"

export const AllUsersList = ({ currentUser}) => {
    const [allUsers, setAllUsers] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
        getAllUsers().then((usersArray) => {
            setAllUsers(usersArray)
        })
    }, [])

    const getAndSetUsers = () => {
        getAllUsers().then((usersArray) => {
          setAllUsers(usersArray)
        })
      }

 const handleDelete = (userToDelete) => {
      if(window.confirm("Are you sure you want to delete this profile?")){
        getAllEvents().then(events => {
          const userEvents = events.filter(event => event.userId === userToDelete.id)
          const deleteEventPromises = userEvents.map(event => deleteEvent(event.id))

       
  
          Promise.all(deleteEventPromises)
          .then(() => {
            deleteUser(userToDelete.id)
            .then(() => {
                
              localStorage.removeItem("church-user")
              getAndSetUsers()
              if(currentUser.id === userToDelete.id) {
                navigate("/login")
              }
            })
          })
        
        })
      }
      }


return (
    <div>
        <h1 className="header">All Users</h1>
        <article className="users">
            {allUsers.map(usersObject => {
                return (
                    <div className="all-users-container" >
                        <div className="all-users-box">
                        <div className="all-users-box-info">Name: {usersObject.name}</div>
                        <div className="all-users-box-info">Email: {usersObject.email}</div>
                        <div className="all-users-box-info">Church: {usersObject.church.name}</div>

                        <button 
                             onClick={() => handleDelete(usersObject)}
                            className="profile-buttons">
                                Delete User
                             </button>
                        
                       
                        </div>
                    </div>
                )
            })}
        </article>
    </div>
)
}