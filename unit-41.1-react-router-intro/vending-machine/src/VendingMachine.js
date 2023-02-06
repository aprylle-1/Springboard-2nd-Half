import Soda from "./Soda"
import Chips from "./Chips"
import Ramen from "./Ramen"
import { BrowserRouter, Route } from "react-router-dom"
import Navbar from "./Navbar"
function VendingMachine () {
    return (
        <div>
            <h1>Vending Machine</h1>
            <Navbar/>
        </div>
    )
}

export default VendingMachine;