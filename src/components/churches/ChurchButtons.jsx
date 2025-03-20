import { useState } from "react"
import { deleteChurch } from "../services/ChurchService"
import { Link, useNavigate } from "react-router-dom"
import { getAllChurches } from "../services/ChurchService"



export const ChurchButtons = ({ currentUser, churchObject }) => {

    const [allChurches, setAllChurches] = useState([])
    

    const navigate = useNavigate()
    
    const getAndSetChurches = () => {
        getAllChurches().then((eventsArray) => {
          setAllChurches(eventsArray)
        })
      }
   
    const handleDelete = () => {
        deleteChurch(churchObject.id).then(() => {
          getAndSetChurches()
          navigate("/all-churches")
        })
      }


            return (
                    <div>
                        {currentUser?.id === churchObject.creatorUserId ? (
                            <div>

                             <button 
                              onClick={handleDelete}
                            className="filter-btn btn-primary">
                                Delete
                             </button>
                            <Link to={`/all-churches/edit/${churchObject.id}`} >
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