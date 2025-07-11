import { LogOut, Menu, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router'; // ✅ use react-router-dom
import { clearUser } from '../redux/userSlice';
import axios from 'axios';
import { BASE_URL } from '../constants';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [drop, setDrop] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
            console.log(res.data?.message)
            dispatch(clearUser())
            return navigate('/')
        } catch (error) {
            const errMsg = error.response?.data?.message || "Logout Failed.";
            console.log(errMsg)
        }
    }

    return (
        <header className="bg-gradient-to-b from-purple-700  to-blue-600 text-white p-4 shadow-md sm:px-20 px-6 py-3">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-4xl font-bold logoText">
                    linkify
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    {isAuthenticated && <NavLink to='user/dashboard' className={({ isActive }) => `navLink ${isActive ? 'text-yellow-300 font-medium underline underline-offset-4' : ''
                        }`
                    }>
                        Dashboard
                    </NavLink>}
                    <NavLink to="/" className={({ isActive }) => `navLink ${isActive ? 'text-yellow-300 font-medium underline underline-offset-4' : ''}`}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `navLink ${isActive ? 'text-yellow-300 font-medium underline underline-offset-4' : ''
                        }`
                    }>
                        About Us
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `navLink ${isActive ? 'text-yellow-300 font-medium underline underline-offset-4' : ''
                        }`
                    }>
                        Contact

                    </NavLink>

                    {isAuthenticated ?
                        <div className="relative">
                            <button onClick={() => setDrop(prev => !prev)} className="text-lg focus:ring-2 focus:text-yellow-500 focus:ring-yellow-500 rounded-[50%] p-1  cursor-pointer flex items-center">
                                <User />
                            </button>

                            {drop &&
                                <div className='absolute shadow-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 mt-2 rounded-md -left-33'>
                                    <p className='border-b-2 px-5 py-2 text-gray-200'>{user.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="px-5 py-2 flex items-center text-gray-200 font-semibold rounded gap-2 "
                                    >
                                        Log out
                                    </button>
                                </div>
                            }
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
