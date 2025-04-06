import { useState, useEffect } from "react";
import { getAllUsersById } from "../services/userService";
import { useParams} from "react-router-dom";
import { UserButtons } from "./ProfileButtons";
import "./Profile.css"



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
        <h1 className="header">My Profile</h1>
        <article>
            {usersProfile.map(usersObject => {
                return (
                    <div className="profile-container">
                        <div className="profile-box">
                        <div className="profile-name">Name: {usersObject.name}</div>
                        <div className="profile-email">Email: {usersObject.email}</div>
                        <div className="profile-church">Church: {usersObject.church.name}</div>
                        <UserButtons currentUser={currentUser} usersObject={usersObject}/>
                        </div>
                    </div>
                )
            })}
        </article>
    </div>
)
}