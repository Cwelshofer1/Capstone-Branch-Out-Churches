import { useState } from "react"
import { deleteChurch } from "../services/ChurchService"
import { Link, useNavigate } from "react-router-dom"
import { getAllChurches } from "../services/ChurchService"
import { getAllUsers } from "../services/userService"
import { deleteUser } from "../services/userService"



export const UserButtons = ({ currentUser, usersObject }) => {

    const [allUsers, setAllUsers] = useState([])
    

    const navigate = useNavigate()
    
    const getAndSetUsers = () => {
        getAllUsers().then((usersArray) => {
          setAllUsers(usersArray)
        })
      }
   
    const handleDelete = () => {
        deleteUser(allUsers.id).then(() => {
          getAndSetUsers()
          navigate("/login")
        })
      }


            return (
                    <div>
                        {currentUser?.id === usersObject.id ? (
                            <div>

                             <button 
                              onClick={handleDelete}
                            className="filter-btn btn-primary">
                                Delete
                             </button>
                            <Link to={`/profile/edit/${usersObject.id}`} >
                              <button 
                              className="filter-btn btn-primary" >
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