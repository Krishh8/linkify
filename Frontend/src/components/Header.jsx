import { LogOut, Menu, User, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router';
import { clearUser } from '../redux/userSlice';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { showToast } from '../utils/toast';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [drop, setDrop] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDrop(false);
            }
        };

        if (drop) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drop]);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
            showToast({
                type: "success",
                message: res.data?.message,
            });
            dispatch(clearUser());
            setDrop(false);
            return navigate('/');
        } catch (error) {
            const errMsg = error.response?.data?.message || "Logout Failed.";
            showToast({
                type: "error",
                message: errMsg,
            });
        }
    };

    return (
        <header className="bg-gradient-to-b from-black to-gray-900 text-white shadow-2xl sm:px-20 px-6 py-2">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-4xl py-2 font-bold logoText">
                    linkify
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    {isAuthenticated ?
                        <NavLink to='/user/dashboard' className={({ isActive }) => `navLink transition-all duration-300  ${isActive ? 'text-yellow-300 font-medium underline underline-offset-4' : ''
                            }`
                        }>
                            Dashboard
                        </NavLink> :
                        <NavLink to="/" className={({ isActive }) => `navLink ${isActive ? 'text-yellow-300 font-medium underline underline-offset-4' : ''}`}>
                            Home
                        </NavLink>
                    }
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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDrop(prev => !prev)}
                                className="text-lg ring-2 ring-yellow-300 text-yellow-300 hover:ring-yellow-500 hover:text-yellow-500 rounded-full p-1.5 cursor-pointer flex items-center transition-all duration-300"
                            >
                                <User size={20} />
                            </button>

                            {drop && (
                                <div className='absolute shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-yellow-500/30 mt-2 rounded-lg right-0 min-w-[200px] z-50 animate-in fade-in slide-in-from-top-2'>
                                    <div className='border-b border-yellow-500/20 px-4 py-3'>
                                        <p className='text-yellow-400 text-sm font-medium truncate'>{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-3 flex items-center text-amber-300 hover:text-yellow-400 hover:bg-gray-800/50 font-semibold rounded-b-lg gap-2 transition-colors duration-200"
                                    >
                                        <LogOut size={18} /> Log out
                                    </button>
                                </div>
                            )}
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
                            <NavLink to='/user/dashboard' className={({ isActive }) => `navLink ${isActive ? 'text-black font-medium underline underline-offset-4' : ''
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
        </header>
    );
}

export default Header;
