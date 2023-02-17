import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import { useState, useEffect } from "react";
function Company () {
    const {handle} = useParams()

    const [company, setCompany] = useState(null)

    useEffect(()=>{
        async function getCompany() {
            const company = await JoblyApi.getCompany(handle)
            setCompany(company)
        }

        getCompany()
    },[company, handle])

    console.log(company)
    
    if (!company) {
        return (<h1>...Loading</h1>)
    }
    else {
        return(
            <div className="Company">
                <div className="Company-title">{company.name}</div>
                <div className="Company-description">{company.description}</div>
                <div>Employees: {company.numEmployees}</div>
            </div>
        )
    }
}

export default Company