import { useState } from "react";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useParams, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";

function ResetPassword() {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [confirmError, setConfirmError] = useState("");
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();
    const { token } = useParams();

    const toggleConfirmPasswordShow = () => setConfirmPasswordShow(prev => !prev);

    const {
        password,
        passwordShow,
        error,
        touched,
        handlePasswordChange,
        handleBlur,
        togglePasswordShow,
    } = useForm();

    const validateConfirmPassword = (value) => {
        if (!value.trim()) return "Confirm password is required";
        if (value !== password) return "Passwords do not match";
        return "";
    };

    const validatePasswordOnly = () => {
        if (!password.trim()) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark password as touched and validate
        handleBlur("password");
        const isValid = validatePasswordOnly();

        // Validate confirm password
        const confirmErr = validateConfirmPassword(confirmPassword);
        setConfirmError(confirmErr);
        setConfirmTouched(true);

        if (!isValid || confirmErr) return;

        setLoading(true);
        setApiError("");
        setSuccessMsg("");

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/reset-password/${token}`, {
                newPassword: password, confirmPassword: confirmPassword
            });

            setSuccessMsg(res.data.message || "Password reset successfully!");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1500);
        } catch (err) {
            setApiError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="hidden md:flex md:flex-col gap-4 justify-center items-center bg-gradient-to-tl from-yellow-500 to-red-400 rounded-r-[0%] h-screen w-1/2">
                <h2 className="text-5xl text-blue-900 font-bold">Reset Password</h2>
                <p className="text-xl text-blue-900">Set your new password to continue.</p>
            </div>


            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium pb-10 md:pb-5 logoText">linkify</h2>
                <h2 className="md:hidden text-3xl font-bold text-blue-900">Reset Password</h2>

                {apiError && <p className="text-red-400 text-sm mt-2">{apiError}</p>}
                {successMsg && <p className="text-green-500 text-sm mt-2">{successMsg}</p>}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full max-w-md">
                    <PasswordInput
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={() => handleBlur("password")}
                        error={error.password}
                        touched={touched.password}
                        show={passwordShow}
                        toggleShow={togglePasswordShow}
                    />

                    {/* Confirm password */}
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(value) => {
                            setConfirmPassword(value);
                            if (confirmTouched) setConfirmError(validateConfirmPassword(value));
                        }}
                        onBlur={() => {
                            setConfirmTouched(true);
                            setConfirmError(validateConfirmPassword(confirmPassword));
                        }}
                        error={confirmError}
                        touched={confirmTouched}
                        show={confirmPasswordShow}
                        toggleShow={toggleConfirmPasswordShow}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
