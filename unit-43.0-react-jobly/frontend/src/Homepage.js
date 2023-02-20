import { NavLink } from "react-router-dom";
import './Homepage.css'
function Homepage ({currentUser}) {
    if (currentUser) {
        return (
            <div className="Homepage">
                <div className="Homepage-content">
                <h1>Jobly</h1>
                <div>“The best preparation for tomorrow is doing your best today.” - H. Jackson Brown, Jr.</div>
                <h2>Welcome back, {currentUser.firstName}</h2>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="Homepage">
                <div className="Homepage-content">
                <h1>Jobly</h1>
                <div>“If opportunity doesn't knock, build a door.” - Milton Berle.</div>
                <div className="Homepage-buttons">
                <NavLink className="Homepage-btn btn btn-info" to="/login">Login</NavLink>
                <NavLink className="Homepage-btn btn btn-info" to="/signup">Signup</NavLink>
                </div>
                </div>
            </div>
        )
    }
}

export default Homepage;