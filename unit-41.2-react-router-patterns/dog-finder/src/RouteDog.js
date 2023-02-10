import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dog from "./Dog";
function RouteDog({dogs}) {
    const {name} = useParams()
    const navigate = useNavigate()
    const dog = dogs.filter(dog => {
        return (dog.name.toLowerCase() === name)
    })

    useEffect (()=>{
        if (dog.length === 0) {
            navigate("/dogs");
        }
    })
    
    if (dog.length === 0) {
        return <></>
    }
    
    else {
        return (
            <>
            <Dog name={dog[0].name} age={dog[0].age} facts={dog[0].facts} img={dog[0].src}/>
            <NavLink to="/dogs">Back to All Dogs</NavLink>
            </>
        )
    }
}

export default RouteDog