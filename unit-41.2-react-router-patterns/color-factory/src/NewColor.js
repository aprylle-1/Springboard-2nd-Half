import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./NewColor.css"
function NewColor ({addColor}) {
    const initialState = {
        colorName : "",
        colorHex : "#000000"
    }
    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()
    function formHandler (e) {
        const {name, value} = e.target
        const newFormData = {
            ...formData,
            [name] :value
        }
        setFormData(newFormData)
    }

    function handleSubmit (e) {
        e.preventDefault()
        addColor(formData)
        setFormData(initialState)
        navigate("/colors")
    }
    return (
        <div className="NewColor">
            <h1><NavLink to="/colors">Colors</NavLink></h1>
            <form onSubmit={handleSubmit}>
            <div>
            <input 
            onChange={formHandler} 
            value={formData.colorName} 
            type="text" 
            name="colorName" 
            id="color-name"
            />
            </div>
            <div>
            <input 
            onChange={formHandler} 
            value={formData.colorHex} 
            type="color" 
            name="colorHex" 
            id="color-hex"
            />
            </div>
            <div>
            <button>Add color</button>
            </div>
            </form>
        </div>
    )
}

export default NewColor