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
        <h1 className="header">Churches</h1>
        <article className="churches">
            {allChurches.map(churchesObject => {
                return (
                    <div className="church-container" >
                        <div className="church-box">
                    <Link  onClick={() => window.scrollTo(0, 0)}key={churchesObject.id} to={`/all-churches/${churchesObject.id}`}>
                        <div className="church-box-name">{churchesObject.name}</div>
                        </Link>
                        <div className="church-box-info">{churchesObject.address}</div>
                        <div className="church-box-info">{churchesObject.contactNumber}</div>
                        
                       
                        </div>
                    </div>
                )
            })}
        </article>
    </div>
)
}