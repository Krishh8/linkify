import { useState } from "react";
import validator from "validator";

export default function useForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [error, setError] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });

    const togglePasswordShow = () => setPasswordShow(prev => !prev);

    const validateEmail = (value) => {
        if (!value.trim()) return "Email is required";
        if (!validator.isEmail(value)) return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (value) => {
        if (!value.trim()) return "Password is required";
        return "";
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (touched.email) {
            setError(prev => ({ ...prev, email: validateEmail(value) }));
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (touched.password) {
            setError(prev => ({ ...prev, password: validatePassword(value) }));
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        if (field === "email") {
            setError(prev => ({ ...prev, email: validateEmail(email) }));
        } else if (field === "password") {
            setError(prev => ({ ...prev, password: validatePassword(password) }));
        }
    };

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        setError({ email: emailError, password: passwordError });
        return !emailError && !passwordError;
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setPasswordShow(false);
        setError({ email: "", password: "" });
        setTouched({ email: false, password: false });
    };

    return {
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
        resetForm,
    };
}

