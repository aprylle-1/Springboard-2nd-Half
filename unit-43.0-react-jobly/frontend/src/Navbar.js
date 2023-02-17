import { NavLink } from "react-router-dom";
import "./Navbar.css"
function Navbar() {
    return (
        <nav className="Navbar">
            <div className="Navbar-logo">Jobly</div>
            <div className="Navbar-navlinks">
            <div className="Navbar-navlink">
                <NavLink to="/companies">Companies</NavLink>
            </div>
            <div className="Navbar-navlink">
                <NavLink to="/jobs">Jobs</NavLink>
            </div>
            <div className="Navbar-navlink">
                <NavLink to="/profile">Profile</NavLink>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;