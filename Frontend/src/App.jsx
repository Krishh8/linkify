import Layout from './Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import NotFound from './components/NotFound';
import Dashboard from './components/User/Dashboard';
import PublicRoute from './components/Auth/PublicRoute';
import PrivateRoute from './components/Auth/PrivateRoute';
import ResetPassword from './components/Auth/ResetPassword';
import ForgotPassword from './components/Auth/ForgotPassword';
import VerifyEmail from './components/Auth/VerifyEmail';
import SendVerificationEmail from './components/Auth/SendVerificationEmail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Routes, Route } from 'react-router';
import axios from 'axios';
import { clearUser, setUser } from './redux/userSlice';
import { BASE_URL } from './constants';

function App() {
    const dispatch = useDispatch();
    const { loadingUser } = useSelector((state) => state.user); // 👈 get flag

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/auth/me`, {
                    withCredentials: true,
                });
                dispatch(setUser(res.data.user));
            } catch (error) {
                console.log(error.response?.data?.message || "User fetch failed.");
                dispatch(clearUser());
            }
        };

        fetchUser();
    }, [dispatch]);

    if (loadingUser) return <div className="text-white text-center mt-20">Loading user session...</div>; // or <Loader />

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index
                    element={
                        <PublicRoute>
                            <Home />
                        </PublicRoute>
                    }
                />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />

                <Route path="/user/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Route>

            <Route path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route path="/signup"
                element={
                    <PublicRoute>
                        <SignUp />
                    </PublicRoute>
                }
            />
            <Route path="/forgot-password"
                element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                }
            />
            <Route path="/reset-password/:token"
                element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                }
            />

            <Route path="/verify-email/:token"
                element={
                    <PublicRoute>
                        <VerifyEmail />
                    </PublicRoute>
                }
            />

            <Route path="/send-email"
                element={
                    <PublicRoute>
                        <SendVerificationEmail />
                    </PublicRoute>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;