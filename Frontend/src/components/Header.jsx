import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; // ✅ use react-router-dom

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <header className="bg-blue-900 text-white sm:px-20 px-6 py-3">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-semibold">
                    linkify
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    <NavLink to="/" className={({ isActive }) => `rounded transition duration-100 ease-in-out hover:text-sky-400 ${isActive ? 'text-sky-400 font-medium' : ''
                        }`
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `rounded transition duration-100 ease-in-out hover:text-sky-400 ${isActive ? 'text-sky-400 font-medium' : ''
                        }`
                    }>
                        About Us
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `rounded transition duration-100 ease-in-out hover:text-sky-400 ${isActive ? 'text-sky-400 font-medium' : ''
                        }`
                    }>
                        Contact
                    </NavLink>
                    <button onClick={() => navigate('/login')} className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-black hover:text-white cursor-pointer transition duration-400 ease-in-out">
                        Log In
                    </button>
                    <button onClick={() => navigate('/signup')} className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-black hover:text-white cursor-pointer transition duration-400 ease-in-out">
                        Sign Up
                    </button>
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
            {isOpen && (
                <div className="md:hidden flex flex-col gap-4 mt-4 py-3 border-t border-blue-800">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `hover:bg-blue-800 py-2 px-2 transition duration-100 ease-in-out hover:text-sky-400 ${isActive ? 'text-sky-400 font-medium' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => `hover:bg-blue-800 py-2 px-2 transition duration-100 ease-in-out hover:text-sky-400 ${isActive ? 'text-sky-400 font-medium' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => `hover:bg-blue-800 py-2 px-2 transition duration-100 ease-in-out hover:text-sky-400 ${isActive ? 'text-sky-400 font-medium' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        Contact
                    </NavLink>
                    <div className="flex gap-3 mt-2">
                        <button onClick={() => navigate('/login')} className="bg-white text-blue-900 px-4 py-2 rounded hover:bg-black hover:text-white cursor-pointer transition duration-400 ease-in-out">
                            Log In
                        </button>
                        <button onClick={() => navigate('/signup')} className="bg-white text-blue-900 px-4 py-2  hover:bg-black hover:text-white cursor-pointer transition duration-400 ease-in-out">
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;
