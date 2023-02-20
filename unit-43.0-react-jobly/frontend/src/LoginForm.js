import useUpdateForm from "./hooks/useForm";
import "./LoginForm.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function LoginForm ({login, currentUser}) {
    const initialValue = {
        username : "",
        password : ""
    }
    const {form, onChange} = useUpdateForm(initialValue)

    function loginUser(e) {
        e.preventDefault()
        login(form)
    }

    const navigate = useNavigate()
    useEffect(()=>{
        if(currentUser){
            navigate("/")
        }
    },[])
    return (
        <div className="LoginForm">
        <form onSubmit={loginUser}>
            <h2>Login</h2>
            <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={onChange}
                placeholder="username"
            />
            </div>
            <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input
             className="form-control"
             type="password"
             name="password"
             id="password"
             value={form.password}
             onChange={onChange}
             placeholder="password"
            />
            </div>
            <div>
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
        </div>
    )
}

export default LoginForm;