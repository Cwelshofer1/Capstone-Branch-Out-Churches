import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsersById, updateUser } from "../services/userService"
import { getAllChurches } from "../services/ChurchService"





export const EditProfile = ({currentUser}) => {

    const  [user, setAllUsers ] = useState([])
    const  [church, setAllChurches ] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        getAllChurches().then((churchesArray) => {
            setAllChurches(churchesArray)
        })
        
    }, [])
   
    useEffect(() => {
   getAllUsersById(id).then((data) => {
        const userObj = data[0]
        setAllUsers(userObj)
    })
}, [id])




const handleSave = (evt) => {
    evt.preventDefault()

    const editedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        churchId: user.churchId
       
        

    }
    updateUser(editedUser).then(() => {
        navigate(`/profile/${currentUser.id}`)
    })
}



    return (
   
        <form className="profile">    
        <h2 className="header">Update Profile</h2>
        <div className="form-container">
            <div className="form-box">
        
            
        <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={user?.name}
                        onChange={(evt) => {
                            const copy = { ...user }
                            copy.name = evt.target.value
                            setAllUsers(copy)
                        } }
                        required
                        className="form-container" />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text" value={user?.email}
                            onChange={(evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                setAllUsers(copy)

                            } }
                            required className="form-container" />
                    </div>
                </fieldset>
                
                <select
                value={user?.churchId} 
                onChange={(evt) => {
                    const copy = { ...user }
                    copy.churchId = parseInt(evt.target.value)
                    setAllUsers(copy)

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
                            className="edit-profile-button">Update Profile</button>
                    </div>
                </fieldset>
               </div>   
            </div>
        </form>
    )
}
