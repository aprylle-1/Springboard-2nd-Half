import { NavLink } from "react-router-dom";

function CompanyLink ({company}) {
    const link  = `/companies/${company.handle}`
    return (
        <div className="Company">
            <NavLink to={link}><h2>{company.name}</h2></NavLink>
            <p>{company.description}</p>
        </div>
    )
}

export default CompanyLink;