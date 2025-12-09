import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.post(`${BASE_URL}/api/auth/verify-email/${token}`);
                if (res.data.success) {
                    setStatus("success");
                    setMessage("Email verified successfully!");
                    setTimeout(() => {
                        navigate("/login", { replace: true });
                    }, 2000);
                } else {
                    setStatus("error");
                    setMessage(res.data.message || "Verification failed");
                }
            } catch (err) {
                const errorMsg = err.response?.data?.message || "Email verification failed";
                setStatus("error");
                setMessage(errorMsg);
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="flex min-h-screen justify-center items-center">
            {/* Left Panel */}
            <div className="p-4 hidden md:flex md:flex-col gap-4 justify-center items-center bg-gradient-to-tl from-yellow-500 to-red-400 rounded-r-[0%] h-screen w-1/2">
                <h2 className="text-5xl text-blue-900 font-bold">Email Verification</h2>
                <p className="text-xl text-blue-900">Verify your email to continue.</p>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium pb-10 md:pb-5 logoText">linkify</h2>
                <h2 className="md:hidden md:mb-0 mb-5 text-3xl font-bold text-blue-900">Email Verification</h2>

                <div className="w-full max-w-md text-center">

                    {status === "loading" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <Loader2 className="w-16 h-16 text-blue-900 animate-spin" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                                    Verifying your email...
                                </h3>
                                <p className="text-gray-600">
                                    Please wait while we verify your email address.
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <CheckCircle className="w-16 h-16 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-600 mb-2">
                                    Email Verified!
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {message}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Redirecting to login page...
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <XCircle className="w-16 h-16 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-red-600 mb-2">
                                    Verification Failed
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {message}
                                </p>
                                <div className="flex flex-col gap-3 mt-6">
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                                    >
                                        Go to Login
                                    </button>
                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition duration-300"
                                    >
                                        Sign Up Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
