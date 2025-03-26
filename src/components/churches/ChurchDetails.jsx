import { useState, useEffect } from "react";
import { getAllChurchesById } from "../services/ChurchService";
import "./churches.css"
import { useParams} from "react-router-dom";
import { ChurchButtons } from "./ChurchButtons";


export const ChurchDetails = ({currentUser}) => {

    const [allChurches, setAllChurches] = useState([])

     const { id } = useParams()

    useEffect(() => {
        getAllChurchesById(id).then(data => {
            const churchObj = data
            setAllChurches(churchObj)
        })
    },[id])


return (
    <div>
        <h2 className="header">Church Details</h2>
        <article>
            {allChurches.map(churchesObject => {
                return (
                    <div className="church-container">
                        <div className="church-box">
                        <div className="church-box-name">{churchesObject.name}</div>
                        <div className="church-box-address">Address: {churchesObject.address}</div>
                        <div className="church-box-number">Contact Number: {churchesObject.contactNumber}</div>
                        <div className="church-box-description">Description: {churchesObject.description}</div>
                    <ChurchButtons currentUser={currentUser} churchObject={churchesObject}/>
                    </div>
                    </div>
                )
            })}
        </article>
    </div>
)
}