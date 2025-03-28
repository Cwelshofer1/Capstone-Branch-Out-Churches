import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/EventService";
import "./myEvents.css"

export const MyEventList = ({currentUser}) => {
    const [allUserEvents, setAllUserEvents] = useState([])

    const getAndSetEvents = () => {
        getAllEvents().then((eventsArray) => {
          if (currentUser){
            const userEvents = eventsArray.filter(
            (event) => event?.userId === currentUser?.id)
            setAllUserEvents(userEvents)
          } 
        })
      }

useEffect(() => {
    getAndSetEvents()
  }, [currentUser])
  
    
return (
    <div>
        <h1 className="header"> My Events</h1>
        <article className="events">
            {allUserEvents.length === 0 ? (
                <div className="no-events">You have no events currently</div>
            ) : (
            allUserEvents.map(eventsObject => (

                    <div key={eventsObject.id} className="event-container">
                        <div className="event-box">
                    <Link 
                    onClick={() => window.scrollTo(0, 0)} 
                    to={`/all-events/${eventsObject.id}`}
                    >
                        <div className="event-box-title">{eventsObject.title}</div>
                        </Link>
                        <div className="event-box-date">Date: {new Date(eventsObject.timeStamp).toLocaleDateString('en-us',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        })}
                            
                        </div>
                        <div className="event-box-description">Description: {eventsObject.description}</div>
                        
                        <div className="event-box-church">Church: {eventsObject.church.name}</div>
                        <div> Number of people attending: {eventsObject.userConfirmingEvent?.length || 0}
                        </div>
                        </div>
                    </div>
              ))
            )}
        </article>
    </div>
)
}