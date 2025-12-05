import React, { useState } from "react";
import resetPasswordImage from "../../assets/resetPassword.avif";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useParams, useNavigate } from "react-router";
import useLoginForm from "../../hooks/useLoginForm";

const ResetPassword = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [confirmError, setConfirmError] = useState("");

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();
    const { token } = useParams(); // reset/:token

    const {
        password,
        passwordShow,
        error,
        touched,
        handlePasswordChange,
        handleBlur,
        togglePasswordShow,
        validateForm,
    } = useLoginForm();

    const validateConfirmPassword = (value) => {
        if (!value.trim()) return "Confirm password is required";
        if (value !== password) return "Passwords do not match";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        const confirmErr = validateConfirmPassword(confirmPassword);

        setConfirmError(confirmErr);
        setConfirmTouched(true);

        if (!isValid || confirmErr) return;

        setLoading(true);
        setErr("");
        setSuccessMsg("");

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/reset-password/${token}`, {
                password,
            });

            setSuccessMsg(res.data.message || "Password reset successfully!");

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
        <div className="flex min-h-screen justify-center items-center">
            <div className="hidden md:flex justify-center items-center border-r-2 border-r-blue-900 h-screen w-1/2">
                <img src={resetPasswordImage} alt="reset-password" className="h-2/3 w-full" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-3xl font-bold text-blue-900">Reset Password</h2>

                {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
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
                        show={passwordShow}
                        toggleShow={togglePasswordShow}
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
};

export default ResetPassword;
