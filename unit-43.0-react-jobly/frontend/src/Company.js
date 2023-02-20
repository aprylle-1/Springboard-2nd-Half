import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import { useState, useEffect } from "react";
import "./Company.css"
import Job from "./Job";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
function Company ({currentUser, apply}) {
    const {handle} = useParams()

    const [company, setCompany] = useState(null)
    const [jobs, setJobs] = useState(null)

    useEffect(()=>{
        async function getCompany() {
            const company = await JoblyApi.getCompany(handle)
            setCompany(company)
            setJobs(company.jobs)
        }

        getCompany()
    },[])

    const navigate = useNavigate()
    useEffect(()=>{
        if(!currentUser){
            navigate("/")
        }
    },[])
    
    if (!company) {
        return (<h1>...Loading</h1>)
    }
    else {
        return(
            <div className="Company">
                <div className="Company-banner">
                    <div className="Company-title">{company.name}</div>
                    <div className="Company-description">{company.description}</div>
                    <div>Employees: {company.numEmployees}</div>
                </div>
                <div className="Company-jobs">
                    {jobs.map(job=><Job job={job} key={v4()} apply={apply} username={currentUser.username} applications={currentUser.applications}/>)}
                </div>
            </div>
        )
    }
}

export default Company