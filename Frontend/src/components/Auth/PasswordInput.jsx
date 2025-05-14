// components/Auth/PasswordInput.jsx
import { Eye, EyeOff } from "lucide-react"

export default function PasswordInput({ value, onChange, onBlur, error, touched, show, toggleShow }) {
    return (
        <div>
            <label htmlFor="password" className="block text-lg font-medium text-blue-900">
                Password
            </label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    id="password"
                    value={value}
                    placeholder="Enter your password"
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    className={`w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 ${error && touched ? "outline-red-500" : "outline-blue-400"
                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-700 sm:text-sm/6`}
                />
                <span
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
            </div>
            {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
