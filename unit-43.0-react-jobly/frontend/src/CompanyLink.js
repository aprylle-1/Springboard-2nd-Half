import { NavLink } from "react-router-dom";
import './CompanyLink.css'
function CompanyLink ({company}) {
    const link  = `/companies/${company.handle}`
    return (
        <div className="CompanyLink">
            <NavLink to={link}><h2>{company.name}</h2></NavLink>
            <p>{company.description}</p>
        </div>
    )
}

export default CompanyLink;