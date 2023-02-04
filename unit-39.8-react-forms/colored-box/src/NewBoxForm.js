import { useState } from "react";
function NewBoxForm ({createBox}) {

    const defaultFormData = {
        backgroundColor : "",
        height : 0,
        width : 0
    }
    const [formData, setFormData] = useState(defaultFormData)
    
    function onChange (e) {
        const { name, value } = e.target
        setFormData((data) => {
            return ({
                ...data,
                [name] : value
            })
        })
    }

    function onSubmit (e){
        e.preventDefault()
        createBox(formData)
    }
    
    return(
        <form onSubmit={onSubmit} className="NewBoxForm">
            <label htmlFor="backgroundColor">Background Color</label>
            <input
            onChange={onChange}
            value = {formData.backgroundColor}
            id = "backgroundColor"
            type = "text"
            name = "backgroundColor"
            />

            <label htmlFor="height">Box Height</label>
            <input 
            onChange={onChange}
            value = {formData.height}
            id = "height"
            type = "number"
            name = "height"
            />

            <label htmlFor="width">Box Width</label>
            <input 
            onChange = {onChange}
            value = {formData.width}
            id = "width"
            type = "number"
            name = "width"
            />

            <button>Create Box</button>

        </form>
    )
}

export default NewBoxForm