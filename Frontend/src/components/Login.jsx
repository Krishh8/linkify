import LoginForm from "./Auth/LoginForm";
import loginImage from '../assets/login.svg';


export default function Login() {
    return (
        <div className="flex min-h-screen">
            {/* Left Panel */}
            <div className="hidden md:block w-1/2 border-r-2 border-r-blue-900">
                <img src={loginImage} alt="login" className="h-full w-full object-fill" />
            </div>

            {/* Login Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium text-blue-900 pb-10">linkify</h2>
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-blue-900">Sign in to your account</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
