import LoginForm from "./LoginForm";
import { NavLink } from "react-router";

function Login() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="hidden md:flex md:flex-col gap-4 justify-center items-center bg-gradient-to-tl from-yellow-500 to-red-400 rounded-r-[0%] h-screen w-1/2">
                <h2 className="text-5xl text-blue-900 font-bold">Hello, Welcome!</h2>
                <p className="text-xl text-blue-900">Don't have an account? Create one now.</p>
                <NavLink to='/signup' className="px-4 w-1/2 text-center py-3 rounded-md bg-blue-700 hover:bg-blue-900 text-white transition duration-300 text-lg">Create new Account</NavLink>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium pb-10 logoText">linkify</h2>
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-blue-900">Login</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default Login;
