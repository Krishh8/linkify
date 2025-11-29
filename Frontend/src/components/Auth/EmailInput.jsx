// components/Auth/EmailInput.jsx
export default function EmailInput({ value, onChange, onBlur, error, touched }) {
    return (
        <div>
            <label htmlFor="email" className="block text-lg font-medium text-blue-900">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={value}
                placeholder="Enter your email"
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${error && touched ? "outline-red-400" : "outline-blue-400"
                    } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-700 sm:text-sm/6`}
            />
            {error && touched && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    )
}
