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
        <h2>Church Details</h2>
        <article>
            {allChurches.map(churchesObject => {
                return (
                    <div>
                        <div>{churchesObject.name}</div>
                        <div>{churchesObject.address}</div>
                        <div>{churchesObject.contactNumber}</div>
                        <div>{churchesObject.description}</div>
                    <ChurchButtons currentUser={currentUser} churchObject={churchesObject}/>
                    </div>
                )
            })}
        </article>
    </div>
)
}