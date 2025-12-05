import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const res = await axios.post(`${BASE_URL}/auth/verify-email/${token}`);
            if (res.data.success) {
                alert("Email verified successfully");
                navigate("/login", { replace: true });
            } else {
                alert(data.message);
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <h2>Verifying email...</h2>
    );
};

export default VerifyEmail;
