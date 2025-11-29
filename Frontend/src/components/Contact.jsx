import axios from 'axios';
import { useState } from 'react'
import { BASE_URL } from '../constants';

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [err, setErr] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, name, message } = formData;
        if (email.trim().length == 0 || name.trim().length == 0 || message.trim().length == 0) {
            setErr("All fields are required.")
            return;
        }
        try {
            const res = await axios.post(`${BASE_URL}/api/contact`, formData, { withCredentials: true });
            const data = res.data
            console.log(data)
        } catch (error) {
            const errMsg = error.response?.data?.message || "Contact Failed.";
            setErr(errMsg)
        }

    };

    return (
        <div className='bodyGradient min-h-screen flex justify-center items-center'>
            <div className="max-w-xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
                <p className="mb-8 text-lg text-center text-gray-200">
                    Have questions, suggestions, or need help? Reach out to us below.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {err && <p className="text-red-400 text-sm mb-1">{err}</p>}
                    <div>
                        <label className="block mb-1 font-medium">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Message</label>
                        <textarea
                            className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Your message..."
                            onChange={handleChange}
                            name="message"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-50">
                    Or email us directly at:{" "}
                    <a href="mailto:support@linkify.com" className="text-yellow-300 underline">
                        support@linkify.com
                    </a>
                </div>
            </div></div>
    )
}

export default Contact