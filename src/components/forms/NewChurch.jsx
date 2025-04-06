import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createChurch } from "../services/ChurchService"
import "./forms.css"





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
        image: church.image
        

    }
    createChurch(newChurch).then(() => {
        navigate(`/all-churches`)
    })
}



    return (
   
        <form>    
        <h2 className="header">Add a new church to the list!</h2>
        <div className="form-container">
            <div className="form-box">
        
            
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
                    <input type="tel"
                        required 
                        value={church?.contactNumber}
                        onChange={(evt) => {
                            const copy = { ...church }
                            copy.contactNumber = evt.target.value
                            setAllChurches(copy)
                        } }  className="form-container" />
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
                <label>Image Url:</label>
                    <input type="url"
                        value={church?.image}
                        onChange={(evt) => {
                            const copy = { ...church }
                            copy.image = evt.target.value
                            setAllChurches(copy)
                        } } required className="form-container" />
                        </div>
                </fieldset>

            

                <fieldset>
                    <div className="form-group">
                        <button  onClick={handleSave}
                            className="new-church-button">Save Church</button>
                    </div>
                </fieldset>
               </div>   
            </div>
        </form>
    )
}
