import useUpdateForm from "./hooks/useForm";

function SignUpForm () {
    const initialValue = {
        firstName : "",
        lastName : "",
        password : "",
        email : "",
        username : ""
    }

    const {form, onChange} = useUpdateForm(initialValue)

    return (
        <form>
            <h2>Sign Up</h2>
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
                type="email"
                name="email"
                id="username"
                value={form.email}
                onChange={onChange}
                placeholder="email"
            />
            </div>
            <div>
                <input
                type="text"
                name="firstName"
                id="firstName"
                value={form.firstName}
                onChange={onChange}
                placeholder="First Name"
            />
            </div>
            <div>
                <input
                type="text"
                name="lastName"
                id="lastName"
                value={form.lastName}
                onChange={onChange}
                placeholder="Last Name"
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
        </form>
    )
}

export default SignUpForm;