// components/Auth/LoginForm.jsx
import { NavLink } from "react-router"
import useLoginForm from "../../hooks/useLoginForm"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"

export default function SignUpForm() {
    const {
        email,
        password,
        passwordShow,
        error,
        touched,
        setTouched,
        handleEmailChange,
        handlePasswordChange,
        handleBlur,
        togglePasswordShow,
        validateForm,
    } = useLoginForm()

    const handleSubmit = (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })

        if (validateForm()) {
            console.log("Submitting:", { email, password })
            // Add your login logic here
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <EmailInput
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur("email")}
                error={error.email}
                touched={touched.email}
            />

            <PasswordInput
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur("password")}
                error={error.password}
                touched={touched.password}
                show={passwordShow}
                toggleShow={togglePasswordShow}
            />

            <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
                Create account
            </button>

            <div>Already have account ? <NavLink to='/login' className='text-blue-900 hover:underline hover:font-medium  underline-offset-4'>Login</NavLink></div>
        </form>
    )
}
