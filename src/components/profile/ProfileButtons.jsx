import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllUsers } from "../services/userService"
import { deleteUser } from "../services/userService"
import { getAllUsersById } from "../services/userService"


export const UserButtons = ({ currentUser, usersObject }) => {

    const [allUsers, setAllUsers] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    
    const getAndSetUsers = () => {
        getAllUsers().then((usersArray) => {
          setAllUsers(usersArray)
        })
      }

    useEffect(() => {
   getAllUsersById(id).then((data) => {
        const userObj = data[0]
        setAllUsers(userObj)
    })
}, [id])
   
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