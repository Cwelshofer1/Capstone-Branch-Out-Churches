import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/EventService";

export const EventsList = () => {
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        getAllEvents().then((eventsArray) => {
            setAllEvents(eventsArray)
        })
    }, [])
    
return (
    <div>
        <h2>Events</h2>
        <article className="events">
            {allEvents.map(eventsObject => {
                return (
                    <div>
                    <Link key={eventsObject.id} to={`/all-events/${eventsObject.id}`}>
                        <div>{eventsObject.title}</div>
                        </Link>
                        <div>{eventsObject.description}</div>
                        <div>{eventsObject.church.name}</div>
                        <div>Attending: {eventsObject.userConfirmingEvent?.length || 0}</div>
                        
                    
                    </div>
                )
            })}
        </article>
    </div>
)
}