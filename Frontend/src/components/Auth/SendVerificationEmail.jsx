import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux"; // if email stored in redux

const SendVerificationEmail = () => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();
    const { email } = useSelector((state) => state.user); // get user email

    const handleSubmit = async () => {
        setLoading(true);
        setErr("");
        setSuccessMsg("");

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/send-email`, {
                email,
            });

            setSuccessMsg(res.data.message || "Verification email sent!");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);
        } catch (error) {
            setErr(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col gap-4 text-center px-6">
            <h2 className="text-3xl font-bold text-blue-900">Email Not Verified</h2>
            <p className="text-gray-600 max-w-md">
                To continue, please verify your email address. We’ve sent you an email
                with a verification link. If you didn’t receive it, click the button below to resend.
            </p>

            {err && <p className="text-red-400 text-sm">{err}</p>}
            {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Sending..." : "Resend Verification Email"}
            </button>

            <button
                onClick={() => navigate("/login")}
                className="underline text-blue-900 mt-3"
            >
                Back to Login
            </button>
        </div>
    );
}

export default SendVerificationEmail