import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Auth/Login.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import NotFound from './components/NotFound.jsx';
import Dashboard from './components/User/Dashboard.jsx';
import PublicRoute from './components/Auth/PublicRoute.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store.js';
import axios from 'axios';
import { clearUser, setUser } from './redux/userSlice.js';
import { BASE_URL } from './constants.js';

const LoadApp = () => {
  const dispatch = useDispatch();
  const { loadingUser } = useSelector((state) => state.user); // 👈 get flag

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, []);

  if (loadingUser) return <div className="text-white text-center mt-20">Loading user session...</div>; // or <Loader />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LoadApp />
    </Provider>
  </StrictMode>
);
