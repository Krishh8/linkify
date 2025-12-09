import { BASE_URL } from "../../constants";
import { useState } from "react";
import EmailInput from "./EmailInput";
import axios from "axios";
import useForm from "../../hooks/useForm";

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [apiError, setApiError] = useState("");

    const {
        email,
        error,
        touched,
        handleEmailChange,
        handleBlur,
        setTouched,
    } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true });

        if (email.trim().length === 0 || error.email) return;

        setLoading(true);
        setApiError("");
        setSuccessMsg("");

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
                email,
            });

            setSuccessMsg(res.data.message || "Password reset email sent! Check your mailbox.");
            // navigate('/reset-password');
        } catch (err) {
            setApiError(
                err?.response?.data?.message ||
                "Something went wrong. Please try again!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="hidden md:flex md:flex-col gap-4 justify-center items-center bg-gradient-to-tl from-yellow-500 to-red-400 rounded-r-[0%] h-screen w-1/2">
                <h2 className="text-5xl text-blue-900 font-bold">Forgot Password</h2>
                <p className="text-xl text-blue-900">Enter your email to reset your password.</p>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium pb-10 md:pb-5 logoText">linkify</h2>
                <h2 className="md:hidden text-3xl font-bold text-blue-900">Forgot Password</h2>

                {apiError && <p className="text-red-400 text-sm mt-4">{apiError}</p>}
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
}

export default ForgotPassword;
