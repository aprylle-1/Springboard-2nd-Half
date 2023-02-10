import { NavLink } from "react-router-dom";
import "./Colors.css"
import { v4 } from "uuid";
import CreateNavLink from "./Navlink" 
function Colors ({colors}) {

    return (
        <div className="Colors">
            <header>
                <h2>Welcome to the color factory</h2>
                <h1><NavLink to="/colors/new">Add a color</NavLink></h1>
            </header>
            <p>Please select a color</p>
                <ul>
                {colors.map(color => {
                    const link = `/colors/${color.colorName}`
                    return(<CreateNavLink key={v4()} link={link} colorName={color.colorName}/>)
                }
                )}
                </ul>
        </div>
    )
}

export default Colors