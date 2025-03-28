import { useEffect, useState } from "react"
import { getAllEvents } from "../services/EventService"
import { deleteEvent } from "../services/EventService"
import { Link, useNavigate } from "react-router-dom"
import { createUserattendingEvent, deleteUserAttending, getAllUserConfirmingEvents } from "../services/UserConfirming"

export const EventButton = ({ currentUser, eventsObject }) => {

    const [allEvents, setAllEvents] = useState([])
    const [allUserAttendance, setAllUserAttendance] = useState([])

    const navigate = useNavigate()
    
    const getAndSetEvents = () => {
        getAllEvents().then((eventsArray) => {
          setAllEvents(eventsArray)
        })
      }

      useEffect(() => {
        getAllUserConfirmingEvents().then((UsersArray) => {
            setAllUserAttendance(UsersArray)
        })
    }, [])

          const handleUnattending = () =>{
            let userAttendance = eventsObject.userConfirmingEvent?.find (
              (attendance) => attendance.userId === currentUser.id
            )

            if(userAttendance){
            deleteUserAttending(userAttendance.id).then(() => {
              getAllUserConfirmingEvents().then(updatedAttendance => setAllUserAttendance(updatedAttendance))
                getAllEvents()
                navigate("/all-events")
            })
          }
          }


   
    const handleDelete = () => {
        deleteEvent(eventsObject.id).then(() => {
          getAndSetEvents()
          navigate("/all-events")
        })
      }

 
      const handleSaveEvent = (event) =>{
        event.preventDefault()
        if(eventsObject.description) {
            const newAttending ={
                userId: currentUser.id,
                eventId: eventsObject.id
               
            }
            createUserattendingEvent(newAttending).then(() => {
                navigate("/all-events")
            })

        }
    }
   const isUserAttending = allUserAttendance.find(
    (attendance) =>
      attendance?.userId === currentUser?.id && attendance.eventId === eventsObject.id
   )

return (

    <div>
      <div>Number of people attending: {eventsObject.userConfirmingEvent?.length} </div>
       
                        {currentUser?.id === eventsObject.userId ? (
                            <div>
                              <div className="event-buttons">
                             <button 
                              onClick={handleDelete}
                            className="event-button">
                                Delete
                             </button>
                            <Link onClick={() => window.scrollTo(0, 0)} to={`/all-events/edit/${eventsObject.id}`} >
                              <button 
                              className="event-button" >
                                  Edit
                               </button>
                               </Link>
                             </div>
                             </div> 
                        ) : (
                            isUserAttending ? (
                                 <button
                                  className="event-button-attending"
                                  onClick={handleUnattending}>
                                  Not Attending Event
                                </button>
                              ) : (
                                <button
                                  className="event-button-attending"
                                  onClick={handleSaveEvent}>
                                  Attending Event!
                                </button>
                              )
                            )}
                    
                          </div>
                        );
}