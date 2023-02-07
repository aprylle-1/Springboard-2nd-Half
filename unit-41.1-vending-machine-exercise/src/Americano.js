import './Americano.css'
import { NavLink } from 'react-router-dom'
function Americano () {

    const img = "https://cdn.buttercms.com/AB7ud4YSE6nmOX0iGlgA"
    return (
        <div className="Americano">
            <div>Here you go! One Americano</div>
            <img src={img} alt="Cafe Americano"/>
            <div><NavLink to="/">Order Again</NavLink></div>
        </div>
    )
}

export default Americano