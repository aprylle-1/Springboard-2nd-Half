import useUpdateForm from "./hooks/useForm";

function LoginForm () {
    const initialValue = {
        username : "",
        password : ""
    }
    const {form, onChange} = useUpdateForm(initialValue)

    return (
        <form className="LoginForm">
            <h2>Login</h2>
            <div>
                <input
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={onChange}
                placeholder="username"
            />
            </div>
            <div>
            <input
             type="password"
             name="password"
             id="password"
             value={form.password}
             onChange={onChange}
             placeholder="password"
            />
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default LoginForm;