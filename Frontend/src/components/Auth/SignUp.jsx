import SignUpForm from "./SignUpForm";
import signupImage from '../../assets/signup.svg';


export default function SignUp() {
    return (
        <div className="flex min-h-screen">
            {/* Left Panel */}
            <div className="hidden md:block w-1/2 border-r-2 border-r-blue-900">
                <img src={signupImage} alt="signup" className="h-full w-full object-fill" />
            </div>

            {/* Login Panel */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-20">
                <h2 className="text-6xl font-medium pb-10 logoText">linkify</h2>
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-blue-900">Create a new account</h2>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}
