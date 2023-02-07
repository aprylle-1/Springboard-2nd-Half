import "./Americano.css"
import { NavLink } from "react-router-dom"
function Cappuccino () {
    
    const img = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg"
    return (
        <div className="Americano">
            <div>Here is your cappuccino!</div>
            <div><img src={img} alt="Cappuccino"/></div>
            <div><NavLink to="/">Order Again</NavLink></div>
        </div>
    )
}

export default Cappuccino