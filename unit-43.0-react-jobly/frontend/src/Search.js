import { useState } from "react";
import "./Search.css"
function Search ({searchFunction}) {
    const [search, setSearch] = useState("")

    function handleChange(e) {
        const {value} = e.target
        setSearch(value)
    }

    function getResults(e) {
        e.preventDefault()
        searchFunction(search)
    }
    return(
        <form onSubmit = {getResults} className="Search">
            <input
             onChange = {handleChange}
             name = "search"
             id = "search"
             value = {search}
            />
            <button>Search</button>
        </form>
    )
}

export default Search