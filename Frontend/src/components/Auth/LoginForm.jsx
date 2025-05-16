// components/Auth/LoginForm.jsx
import { NavLink, useNavigate } from "react-router"
import useLoginForm from "../../hooks/useLoginForm"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"
import axios from 'axios'
import { BASE_URL } from "../../constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/userSlice"

export default function LoginForm() {
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
    const dispatch = useDispatch()
    const [err, setErr] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })

        if (!validateForm()) return;

        try {
            console.log("Submitting:", { email, password })
            const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password }, { withCredentials: true });
            console.log(res.data?.message)
            const user = res.data?.user;
            setErr('')
            dispatch(setUser(user))
            navigate('/user/dashboard')
        }
        catch (error) {
            const errMsg = error.response?.data?.message || "Login Failed.";
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

            <div className="flex justify-end">
                <NavLink to='/forgot-password' className="text-blue-900 hover:underline underline-offset-4 hover:font-medium -mt-4">
                    Forgot password?
                </NavLink>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
                Log In
            </button>

            <div>Don't have account ? <NavLink to='/signup' className='text-blue-900 hover:underline hover:font-medium underline-offset-4'>Create new Account</NavLink></div>

        </form>
    )
}
