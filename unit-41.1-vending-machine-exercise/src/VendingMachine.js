import VendingMachinePhoto from "../src/static/VendingMachinePhoto.jfif"
import './VendingMachine.css'
import { NavLink } from "react-router-dom"
function VendingMachine () {
    return (
        <div className="VendingMachine">
        <h1>Coffee Machine!</h1>
        <h2>What's your order?</h2>
        <img src={VendingMachinePhoto} alt="Coffee Vending Machine"/>
        <div className="VendingMachine-Menu">
        <div>
        <NavLink className="VendingMachine-Nav" to="/americano">Americano</NavLink>
        </div>
        <div>
        <NavLink className="VendingMachine-Nav" to="/cappuccino">Cappuccino</NavLink>
        </div>
        <div>
        <NavLink className="VendingMachine-Nav" to="/mocha">Mocha</NavLink>
        </div>        
        </div>
        </div>
    )
}

export default VendingMachine