import { NavLink, useNavigate } from "react-router"
import useForm from "../../hooks/useForm";
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"
import { BASE_URL } from "../../constants"
import { useState } from "react"
import axios from "axios"
import { showToast } from "../../utils/toast";

function SignUpForm() {
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
    } = useForm();

    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })

        if (!validateForm()) return;

        try {
            await axios.post(`${BASE_URL}/api/auth/signup`, { email, password }, { withCredentials: true });
            setApiError("");
            showToast({
                type: "success",
                message: "Sign up successful!",
            });
            navigate('/login', { replace: true });
        }
        catch (err) {
            const errorMsg = err.response?.data?.message || "Sign up Failed.";
            setApiError(errorMsg);
            showToast({
                type: "error",
                message: errorMsg,
                autoClose: 4000,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {apiError && <p className="text-red-400 text-sm mb-1">{apiError}</p>}

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

            <div className="md:hidden text-center">Already have account ? <NavLink to='/login' className='text-blue-900 hover:underline hover:font-medium  underline-offset-4'>Login</NavLink></div>
        </form>
    );
}

export default SignUpForm;
