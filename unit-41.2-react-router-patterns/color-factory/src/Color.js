import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./Color.css"
function Color ({colors}) {
    const navigate = useNavigate()
    const {color} = useParams()
    const selectedColor = colors.filter(currColor=>{
        return color === currColor.colorName
    })
    let styles = {}

    if (selectedColor.length > 0) {
        styles = {
            backgroundColor : selectedColor[0].colorHex
        }
    }

    useEffect(()=>{
        if (selectedColor.length === 0) {
            navigate("/colors")
        }
    })

    if (selectedColor.length > 0){
        return (
            <div style={styles} className="Color">
                <h1 className="Color-header">This is {selectedColor[0].colorName}</h1>
                <div className="Color-header Color-link"><NavLink to="/colors">Go Back</NavLink></div>
            </div>
        )
    }
}

export default Color