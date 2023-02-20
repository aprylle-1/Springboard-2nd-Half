import './Job.css'
function Job ({username, job, applications, apply}) {
    
    async function applyJob (e) {
        e.preventDefault()
        const id = e.target.parentElement.dataset.id
        await apply(username, id)
    }
    return (
        <div className="Job" data-id={job.id}>
            <h2>{job.title}</h2>
            {job.companyName &&
            <p>{job.companyName}</p>
            }
            <p>Salary : {job.salary ? job.salary : "N/A"}</p>
            {applications.includes(job.id) && <p className='Job-alert alert alert-success'>You have applied for this job.</p>}
            {!applications.includes(job.id) && <button onClick={applyJob}>Apply</button>}
        </div>
    )
}

export default Job;