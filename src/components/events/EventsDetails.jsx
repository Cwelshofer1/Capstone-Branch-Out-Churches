import { useState, useEffect } from "react";
import "./events.css"
import { useParams } from "react-router-dom";
import { getAllEventsById } from "../services/EventService";
import { EventButton } from "./EventButtons";
import { getVerse } from "../services/VerseService";



export const EventDetails = ({currentUser}) => {

    const [allEvents, setAllEvents] = useState([])
    const [bibleVerse, setBibleVerse] = useState([])

     const { id } = useParams()

    useEffect(() => {
        getAllEventsById(id).then(data => {
            const eventObj = data
            setAllEvents(eventObj)
        })
    },[id])

   useEffect(() =>  {
    getVerse().then((verseArray) => {
        setBibleVerse(verseArray)
    })
   }, [])


return (

    <div>
        <h2 className="header">Event Details</h2>
        
        <article className="events">
            {allEvents.map(eventsObject => (   
                <div className="event-container">
                    <div className="event-box">
                        
                        <div className="event-box-title">{eventsObject.title}</div>
                        <div className="event-box-date">Date: {new Date(eventsObject.timeStamp).toLocaleDateString('en-us',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        }
                            
                        )}</div>
                        <div className="event-box-church">Church: {eventsObject.church.name}</div>
                        <div className="event-box-description">Description: {eventsObject.description}</div>
                        <div className="event-box-verse">Random bible verse: </div>
                        <div className="event-box-description">{eventsObject.bibleBook} {eventsObject.bibleChapter}:{eventsObject.bibleVerse} - "{eventsObject.bibleText}"</div>
                        <div>Posted by: {eventsObject.user.name}</div>

                       
                        
                    <EventButton eventsObject={eventsObject} currentUser={currentUser}/>
                         </div> 
                         </div> 
                        ))}
                        </article>
                    </div>  
                );
}