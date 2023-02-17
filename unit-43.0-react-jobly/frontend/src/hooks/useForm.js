import { useState } from "react";

function useUpdateForm (initialValue) {
    const [form, setForm] = useState(initialValue)

    function onChange(e) {
        const {name, value} = e.target

        setForm((formValues)=>{
            return {
                ...formValues,
                [name] : value
            }
        })
    }
    return {form, onChange}
}

export default useUpdateForm