import { useNavigate } from "react-router-dom";
import useUpdateForm from "./hooks/useForm";
import { useEffect } from "react";
import { useState } from "react";
import "./Profile.css"
function Profile ({currentUser, update}) {
    const navigate = useNavigate()
    const initialValue = {
        firstName : "",
        lastName : "",
        email : "",
        username : ""
    }
    const {form, onChange, setForm} = useUpdateForm(initialValue)
    const [updated, setUpdate] = useState(false)
    useEffect(()=>{
        setUpdate(false)
        if (!currentUser){
            navigate("/")
        }
        else{
            setForm({
                firstName : currentUser.firstName,
                lastName : currentUser.lastName,
                email : currentUser.email,
                username : currentUser.username
            })
        }
    },[])

    async function updateInfo (e) {
        try{
            e.preventDefault()
            const currentChanges = {
                ...form
            }
            delete currentChanges.username
            await update(form.username, currentChanges)
            setUpdate(true)
        }
        catch (thrownErrors){
            console.log(thrownErrors)
        }
    }
    return (
        <div className="Profile">
        <form onSubmit={updateInfo}>
            <h2>Edit Profile</h2>
            {updated && 
            <div className="alert alert-success">Updated successfully.</div>
            }
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                className="form-control"
                disabled
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={onChange}
                placeholder="username"
                />
            </div>
            <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                required
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={onChange}
                placeholder="email"
            />
            </div>
            <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                required
                className="form-control"
                type="text"
                name="firstName"
                id="firstName"
                value={form.firstName}
                onChange={onChange}
                placeholder="First Name"
            />
            </div>
            <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                required
                className="form-control"
                type="text"
                name="lastName"
                id="lastName"
                value={form.lastName}
                onChange={onChange}
                placeholder="Last Name"
            />
            </div>
            <div>
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
        </div>
    )
}

export default Profile