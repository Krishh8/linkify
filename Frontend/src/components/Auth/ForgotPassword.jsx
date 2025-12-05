import { BASE_URL } from "../../constants";
import { useState } from "react";
import EmailInput from "./EmailInput";
import forgotPasswordImage from "../../assets/forgotPassword.jpg";
import axios from "axios";
import useLoginForm from "../../hooks/useLoginForm";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate()

    const {
        email,
        error,
        touched,
        handleEmailChange,
        handleBlur,
        setTouched,
    } = useLoginForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true });

        if (email.trim().length === 0 || error.email) return;

        setLoading(true);
        setErr("");
        setSuccessMsg("");

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
                email,
            });

            setSuccessMsg(res.data.message || "Password reset email sent!");
            navigate('/reset-password')
        } catch (error) {
            setErr(
                error?.response?.data?.message ||
                "Something went wrong. Please try again!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="hidden md:flex justify-center items-center border-r-2 border-r-blue-900 h-screen w-1/2">
                <img
                    src={forgotPasswordImage}
                    alt="forgot-password"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-3xl font-bold text-blue-900">Forgot Password</h2>

                {err && <p className="text-red-400 text-sm mt-4">{err}</p>}
                {successMsg && <p className="text-green-500 text-sm mt-4">{successMsg}</p>}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full max-w-md">
                    <EmailInput
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => handleBlur("email")}
                        error={error.email}
                        touched={touched.email}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
