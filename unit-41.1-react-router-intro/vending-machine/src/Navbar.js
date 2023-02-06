import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link exact to="/soda">Soda</Link>
            <Link exact to="/chips">Chips</Link>
            <Link exact to="/ramen">Ramen</Link>
        </nav>
    )
}

export default Navbar;