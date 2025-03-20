import { useState, useEffect } from "react";
import "./events.css"
import { useParams } from "react-router-dom";
import { getAllEventsById } from "../services/EventService";
import { EventButton } from "./EventButtons";


export const EventDetails = ({currentUser}) => {

    const [allEvents, setAllEvents] = useState([])
     const { id } = useParams()

    useEffect(() => {
        getAllEventsById(id).then(data => {
            const eventObj = data
            setAllEvents(eventObj)
        })
    },[id])



return (

    <div>
        <h2>Event Details</h2>
        
        <article className="events">
            {allEvents.map(eventsObject => (    
                    <div>
                        <div>{eventsObject.title}</div>
                        <div>{new Date(eventsObject.timeStamp).toLocaleDateString('en-us',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        }
                            
                        )}</div>
                        <div>Church: {eventsObject.church.name}</div>
                        <div>{eventsObject.description}</div>
                        <div>Posted by: {eventsObject.user.name}</div>
                       
                        
                    <EventButton eventsObject={eventsObject} currentUser={currentUser}/>
                         </div> 
                        ))}
                        </article>
                    </div>  
                );
}