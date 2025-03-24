import { useState, useEffect } from "react";
import { getAllUsersById } from "../services/userService";
import { useParams} from "react-router-dom";
import { UserButtons } from "./ProfileButtons";



export const ProfilePage = ({currentUser}) => {

    const [usersProfile, setAllUsersProfile] = useState([])

     const { id } = useParams()

    useEffect(() => {
        getAllUsersById(id).then(data => {
            const userObj = data
            setAllUsersProfile(userObj)
        })
    },[id])


return (
    <div>
        <h2>My Profile</h2>
        <article>
            {usersProfile.map(usersObject => {
                return (
                    <div>
                        <div>{usersObject.name}</div>
                        <div>{usersObject.email}</div>
                        <div>{usersObject.church.name}</div>
                        <UserButtons currentUser={currentUser} usersObject={usersObject}/>
                    
                    </div>
                )
            })}
        </article>
    </div>
)
}