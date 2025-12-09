import { NavLink, useNavigate } from "react-router"
import useForm from "../../hooks/useForm";
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"
import axios from 'axios'
import { BASE_URL } from "../../constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/userSlice"
import { showToast } from "../../utils/toast"

function LoginForm() {
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
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState('');
    const [showResend, setShowResend] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })

        if (!validateForm()) return;

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password }, { withCredentials: true });

            const user = res.data?.user;
            setApiError('');
            setShowResend(false);
            dispatch(setUser(user));
            showToast({
                type: "success",
                message: "Login successful!",
            });
            navigate('/user/dashboard', { replace: true });
        }
        catch (err) {
            const errorMsg = err.response?.data?.message || "Login Failed.";
            setApiError(errorMsg);
            if (errorMsg === "Please verify your email first") {
                setShowResend(true);
            }
        }
    }

    const handleResend = () => {
        navigate('/send-email', { state: { email: email } });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            {apiError && <p className="text-red-400 text-sm mb-1">{apiError}</p>}

            {showResend && (
                <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-900 underline underline-offset-4 hover:font-medium"
                >
                    Verify Email
                </button>
            )}

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

            <div className="md:hidden text-center">Don't have account ? <NavLink to='/signup' className='text-blue-900 hover:underline hover:font-medium underline-offset-4'>Create new Account</NavLink></div>

        </form>
    );
}

export default LoginForm;
