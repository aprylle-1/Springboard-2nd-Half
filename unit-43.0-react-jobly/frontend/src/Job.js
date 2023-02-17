import './Job.css'
function Job ({job}) {
    return (
        <div className="Job" data-id={job.id}>
            <h2>{job.title}</h2>
            <p>{job.companyName}</p>
            <p>Salary : {job.salary ? job.salary : "N/A"}</p>
            <button>Apply</button>
        </div>
    )
}

export default Job;