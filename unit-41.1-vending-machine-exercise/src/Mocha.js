import "./Americano.css"
import { NavLink } from "react-router-dom"
function Mocha () {
    
    const img = "https://www.spoonfulofflavor.com/wp-content/uploads/2021/11/mocha-latte-recipe.jpg"
    return (
        <div className="Americano">
            <div>Here is your mocha latte!</div>
            <div><img src={img} alt="Mocha Latte"/></div>
            <div><NavLink to="/">Order Again</NavLink></div>
        </div>
    )
}

export default Mocha