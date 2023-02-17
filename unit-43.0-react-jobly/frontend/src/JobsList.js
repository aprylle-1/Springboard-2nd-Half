import Search from "./Search";
import Job from "./Job";
import { v4 } from "uuid";
import "./JobsList.css"
import useGetFromApi from "./hooks/useGetFromApi";
import { useState } from "react";
function JobsList() {

    const valuesFromApi = useGetFromApi("jobs")
    const jobs = valuesFromApi.list
    const searchJobs = valuesFromApi.searchValues

    const [currentPage, setCurrentPage] =useState(1)
    const [postPerPage, setPostPerPage] = useState(10)

    const lastPostIndex = currentPage * postPerPage
    const firsPostIndex = lastPostIndex - postPerPage
    const maxPage = Math.ceil(jobs.length/postPerPage)

    const currentJobs = jobs.slice(firsPostIndex, lastPostIndex)

    function changePage (e) {
        e.preventDefault()
        const id = e.target.dataset.id
        setCurrentPage(id)
    }
    const pages = Array.from({length: maxPage}, (x, i) => i + 1);

    return (
        <div className="JobsList">
            <div className="JobsList-banner">
                <div>Find the jobs that matter to you</div>
                <div><Search searchFunction={searchJobs}/></div>
            </div>
            <div className="Jobs-list">
            {currentJobs.map(job=><Job key={v4()} job={job}/>)}
            </div>
            <div>
                {pages.map(num=><button onClick={changePage}data-id={num}>{num}</button>)}
            </div>
        </div>
    )
}

export default JobsList