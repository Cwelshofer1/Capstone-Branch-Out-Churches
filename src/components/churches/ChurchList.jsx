import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllChurches } from "../services/ChurchService"
import "./churches.css"

export const ChurchesList = () => {
    const [allChurches, setAllChurches] = useState([])

    useEffect(() => {
        getAllChurches().then((churchesArray) => {
            setAllChurches(churchesArray)
        })
    }, [])


return (
    <div>
        <h2>Churches</h2>
        <article className="churches">
            {allChurches.map(churchesObject => {
                return (
                    <div>
                    <Link key={churchesObject.id} to={`/churches/${churchesObject.id}`}>
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
}