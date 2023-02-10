import { NavLink } from "react-router-dom"

function CreateNavLink ({colorName, link}) {
    return (
        <li><NavLink to={link}>{colorName}</NavLink></li>
    )
}

export default CreateNavLink