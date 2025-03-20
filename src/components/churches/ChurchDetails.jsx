import { useState, useEffect } from "react";
import { getAllEvents } from "../services/EventService";
import "./churches.css"
import { useParams } from "react-router-dom";


export const churchDetails =() => {

    const [allChurches, setAllChurches] = useState([])

     const { userId } = useParams

    useEffect(() => {
        getAllEvents(userId).then(data => {
            const churchObj = data
            setAllChurches(churchObj)
        })
    },[userId])
}

return (
    <div>
        <h2>Church Details</h2>
        <article className="churches">
            {allChurches.map(churchesObject => {
                return (
                    <div>
                    <Link key={churchesObject.id} to={`/all-churches/${churchesObject}`}>
                        <div>{churchesObject.name}</div>
                        </Link>
                        <div>{churchesObject.address}</div>
                        <div>{churchesObject.contactNumber}</div>
                        <div>{churchesObject.discription}</div>
                    
                    </div>
                )
            })}
        </article>
    </div>
)