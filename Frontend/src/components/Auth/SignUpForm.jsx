import { NavLink, useNavigate } from "react-router"
import useLoginForm from "../../hooks/useLoginForm"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"
import { BASE_URL } from "../../constants"
import { useState } from "react"
import axios from "axios"

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

    const navigate = useNavigate()
    const [err, setErr] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })

        if (!validateForm()) return;

        try {
            console.log("Submitting:", { email, password })
            const res = await axios.post(`${BASE_URL}/api/auth/signup`, { email, password });
            console.log(res.data?.message)
            setErr("")
            return navigate('/login');
        }
        catch (error) {
            const errMsg = error.response?.data?.message || "Sign up Failed.";
            setErr(errMsg)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {err && <p className="text-red-500 text-sm mb-1">{err}</p>}

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
