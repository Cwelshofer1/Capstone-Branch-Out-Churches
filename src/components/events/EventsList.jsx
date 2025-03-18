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
                    <Link key={eventsObject.id} to={`/events/${eventsObject}`}>
                        <div>{eventsObject.title}</div>
                        </Link>
                        <div>{eventsObject.description}</div>
                        <div>{eventsObject.church.name}</div>
                        
                    
                    </div>
                )
            })}
        </article>
    </div>
)
}