import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createChurch } from "../services/ChurchService"





export const NewChurchForm = ({currentUser}) => {

    const  [church, setAllChurches ] = useState([])

    const navigate = useNavigate()


const handleSave = (evt) => {
    evt.preventDefault()

    const newChurch = {
        id: church.id,
        name: church.name,
        address: church.address,
        contactNumber: church.contactNumber,
        description: church.description,
        creatorUserId: currentUser.id,
        

    }
    createChurch(newChurch).then(() => {
        navigate(`/all-churches`)
    })
}



    return (
   
        <form className="profile">    
        <h2>Add a new church to the list!</h2>
        <div>
            <div>
        
            
        <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={church?.name}
                        onChange={(evt) => {
                            const copy = { ...church }
                            copy.name = evt.target.value
                            setAllChurches(copy)
                        } }
                        required
                        className="form-container" />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text" value={church?.address}
                            onChange={(evt) => {
                                const copy = { ...church }
                                copy.address = evt.target.value
                                setAllChurches(copy)

                            } }
                            required className="form-container" />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                <label>Contact Number:</label>
                    <input type="text"
                        value={church?.contactNumber}
                        onChange={(evt) => {
                            const copy = { ...church }
                            copy.contactNumber = evt.target.value
                            setAllChurches(copy)
                        } } required className="form-container" />
                        </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                <label>Description:</label>
                    <input type="text"
                        value={church?.description}
                        onChange={(evt) => {
                            const copy = { ...church }
                            copy.description = evt.target.value
                            setAllChurches(copy)
                        } } required className="form-container" />
                        </div>
                </fieldset>

            

                <fieldset>
                    <div className="form-group">
                        <button onClick={handleSave}
                            className="form-btn btn-primary">Save Event</button>
                    </div>
                </fieldset>
               </div>   
            </div>
        </form>
    )
}
