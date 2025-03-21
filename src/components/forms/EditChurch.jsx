import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateChurch } from "../services/ChurchService"
import { getAllChurchesById } from "../services/ChurchService"




export const EditChurchForm = ({}) => {

    const  [church, setAllChurches ] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()

   
    useEffect(() => {
    getAllChurchesById(id).then((data) => {
        const churchObj = data[0]
        setAllChurches(churchObj)
    })
}, [id])




const handleSave = (evt) => {
    evt.preventDefault()

    const editedChurch = {
        id: church.id,
        name: church.name,
        address: church.address,
        contactNumber: church.contactNumber,
        description: church.description,
        creatorUserId: church.creatorUserId,
        

    }
    updateChurch(editedChurch).then(() => {
        navigate(`/all-churches/${id}`)
    })
}



    return (
   
        <form className="profile">    
        <h2>Update Church Information</h2>
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
