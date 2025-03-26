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
                              <div className="church-buttons">
                             <button 
                              onClick={handleDelete}
                            className="church-button">
                                Delete
                             </button>
                            <Link onClick={() => window.scrollTo(0, 0)} to={`/all-churches/edit/${churchObject.id}`} >
                              <button 
                              className="church-button" >
                                  Edit
                               </button>
                               </Link>
                               </div>
                             </div> 

                        ) : (
                           <div></div>
                            )}
                    
                          </div>
                        );
                    }