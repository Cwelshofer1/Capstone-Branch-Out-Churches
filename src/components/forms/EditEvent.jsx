import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllEventsById } from "../services/EventService"
import { updateEvent } from "../services/EventService"
import { getAllChurches } from "../services/ChurchService"
import { getVerse } from "../services/VerseService"




export const EditEventForm = ({currentUser}) => {

    const [event, setAllEvents ] = useState({})
    const  [church, setAllChurches ] = useState([])
    const [bibleVerse, setBibleVerse] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()

   
    useEffect(() => {
    getAllEventsById(id).then((data) => {
        const eventObj = data[0]
        setAllEvents(eventObj)
    })
}, [id])

useEffect(() => {
    getAllChurches().then((churchesArray) => {
        setAllChurches(churchesArray)
    })
    
}, [])

  useEffect(() =>  {
        getVerse().then((verseArray) => {
            setBibleVerse(verseArray)
        })
       }, [])

const handleSave = (evt) => {
    evt.preventDefault()

    const editedEvent = {
        id: event.id,
        title: event.title,
        timeStamp: event.timeStamp,
        description: event.description,
        userId: currentUser.id,
        churchId: event.churchId,
        bibleBook: bibleVerse.random_verse.book,
        bibleChapter: bibleVerse.random_verse.chapter,
        bibleVerse: bibleVerse.random_verse.verse,
        bibleText: bibleVerse.random_verse.text

    }
    updateEvent(editedEvent).then(() => {
        navigate(`/all-events/${id}`)
    })
}



    return (
   
        <form className="profile">
            
        <h2 className="header">Update Event</h2>
        <div className="form-container">
        
            <div className="form-box">
        
            
        <fieldset>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={event?.title}
                        onChange={(evt) => {
                            const copy = { ...event }
                            copy.title = evt.target.value
                            setAllEvents(copy)
                        } }
                        required
                        className="form-container" />
                </div>
            </fieldset><fieldset>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            type="text" value={event?.description}
                            onChange={(evt) => {
                                const copy = { ...event }
                                copy.description = evt.target.value
                                setAllEvents(copy)

                            } }
                            required className="form-container" />
                    </div>
                </fieldset><fieldset>
                    <input type="datetime-local"
                        value={event?.timeStamp}
                        onChange={(evt) => {
                            const copy = { ...event }
                            copy.timeStamp = evt.target.value
                            setAllEvents(copy)
                        } } />
                </fieldset>

                <select
                value={event?.churchId} 
                onChange={(evt) => {
                    const copy = { ...event }
                    copy.churchId = parseInt(evt.target.value)
                    setAllEvents(copy)

                } }>
                <option value="0">Select a church...</option> 
                {church.map(churchesObject => (
                    
                    <option key={churchesObject.id} value={churchesObject.id} > 
                    {churchesObject.name}
                    </option>
                     ))}
                </select>

                <fieldset>
                    <div className="form-group">
                        <button onClick={handleSave}
                            className="edit-event-button">Save Event</button>
                    </div>

                </fieldset>
               </div>
               
                
            </div>
           
            
        </form>
        
        
    )
}
