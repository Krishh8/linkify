import SignUpForm from "./SignUpForm";
import { NavLink } from "react-router";

function SignUp() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium pb-10 logoText">linkify</h2>
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-blue-900">Create a new account</h2>
                    <SignUpForm />
                </div>
            </div>

            <div className="hidden md:flex md:flex-col gap-4 justify-center items-center bg-gradient-to-tl from-yellow-500 to-red-400 rounded-l-[0%] h-screen w-1/2">
                <h2 className="text-5xl text-blue-900 font-bold">Welcome Back!</h2>
                <p className="text-xl text-blue-900">Already have an account? Login now.</p>
                <NavLink to='/login' className="px-4 w-1/3 text-center py-3 rounded-md bg-blue-700 hover:bg-blue-900 text-white transition duration-300 text-lg">Login</NavLink>
            </div>
        </div>
    );
}

export default SignUp;
