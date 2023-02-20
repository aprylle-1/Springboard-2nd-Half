import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
function Navbar({currentUser, logout}) {

    const navigate = useNavigate()
    function logout_user () {
        logout()
        navigate("/")
    }
    return (
        <nav className="Navbar">
            <div className="Navbar-logo"><NavLink to="/">Jobly</NavLink></div>
            <div className="Navbar-navlinks">
            {currentUser &&
            <div className="Navbar-navlink">
            <NavLink to="/companies">Companies</NavLink>
            </div>
            }
            {currentUser &&
            <div className="Navbar-navlink">
            <NavLink to="/jobs">Jobs</NavLink>
            </div>   
            }
            {currentUser &&
            <div className="Navbar-navlink">
                <NavLink to="/profile">Profile</NavLink>
            </div>
            }
            {currentUser &&
            <div className="Navbar-navlink">
                <button className="Navbar-logout" onClick={logout_user}>Logout {currentUser.username}</button>
            </div>
            }
            {!currentUser &&
            <div className="Navbar-navlink">
                <NavLink to="/login">Login</NavLink>
            </div> 
            }
            {!currentUser &&
            <div className="Navbar-navlink">
                <NavLink to="/signup">Sign Up</NavLink>
            </div> 
            }
            </div>
        </nav>
    )
}

export default Navbar;