import { LogOut, Menu, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router'; // ✅ use react-router-dom
import { clearUser } from '../redux/userSlice';
import axios from 'axios';
import { BASE_URL } from '../constants';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/logout`);
            console.log(res.data?.message)
            dispatch(clearUser())
            return navigate('/')
        } catch (error) {
            const errMsg = error.response?.data?.message || "Logout Failed.";
            console.log(errMsg)
        }
    }

    return (
        <header className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white p-4 shadow-md sm:px-20 px-6 py-3">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-4xl font-bold logoText">
                    linkify
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    {isAuthenticated && <NavLink to='user/dashboard' className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                        }`
                    }>
                        Dashboard
                    </NavLink>}
                    <NavLink to="/" className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''}`}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                        }`
                    }>
                        About Us
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                        }`
                    }>
                        Contact

                    </NavLink>

                    {isAuthenticated ?
                        <div className="relative group inline-block">
                            <div className="text-lg cursor-pointer flex gap-1 items-center">
                                <User />
                                {user?.email}
                            </div>
                            <div className="bg-red-500 gap-2 items-center absolute top-full right-0 mt-2 hidden group-hover:flex z-10 rounded-lg shadow-md px-3 py-2">
                                <LogOut className="w-5 h-5" />
                                <button
                                    onClick={handleLogout}
                                    className="font-semibold hover:underline cursor-pointer"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>

                        :
                        <>
                            <button onClick={() => navigate('/login')} className="btn">
                                Log in
                            </button>
                            <button onClick={() => navigate('/signup')} className="btn">
                                Sign Up
                            </button>
                        </>
                    }
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-xl"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="md:hidden flex flex-col gap-4 mt-4 py-3 border-t border-blue-800">
                        {isAuthenticated &&
                            <NavLink to='user/dashboard' className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                                }`
                            }>
                                Dashboard
                            </NavLink>}
                        <NavLink
                            to="/"
                            className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </NavLink>
                        <div className="flex gap-3 mt-2">
                            {isAuthenticated ?
                                <button onClick={handleLogout} className="btn py-2">
                                    Log out
                                </button>
                                :
                                <>
                                    <button onClick={() => navigate('/login')} className="btn py-2">
                                        Log in
                                    </button>
                                    <button onClick={() => navigate('/signup')} className="btn py-2">
                                        Sign Up
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                )
            }
        </header >
    )
}

export default Header;
