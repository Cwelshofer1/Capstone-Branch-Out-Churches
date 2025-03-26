import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/EventService";
import "./events.css"

export const EventsList = () => {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        getAllEvents().then((eventsArray) => {
            setAllEvents(eventsArray)
        })
    }, [])
    
return (
    <div>
        <h1 className="header">Events</h1>
        <article className="events">
            {allEvents.map(eventsObject => {
                return (
                    <div className="event-container">
                        <div className="event-box">
                    <Link onClick={() => window.scrollTo(0, 0)} key={eventsObject.id} 
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
                        }
                            
                        )}</div>
                        <div className="event-box-description">Description: {eventsObject.description}</div>
                        <div></div>
                        <div className="event-box-church">Church: {eventsObject.church.name}</div>
                        <div>Number of people attending: {eventsObject.userConfirmingEvent?.length || 0}</div>
                        </div>
                    
                    </div>
                )
            })}
        </article>
    </div>
)
}