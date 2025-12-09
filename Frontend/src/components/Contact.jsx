import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../constants';
import { showToast } from '../utils/toast';

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const { email, name, message } = formData;
        if (email.trim().length === 0 || name.trim().length === 0 || message.trim().length === 0) {
            setError("All fields are required.");
            return;
        }
        try {
            await axios.post(`${BASE_URL}/api/contact/send`, formData);
            showToast({
                type: "success",
                message: "Message submitted successfully.",
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Contact Failed.";
            showToast({
                type: "error",
                message: errorMsg,
            });
        }
        finally {
            setFormData({
                name: "",
                email: "",
                message: ""
            });
        }
    };

    return (
        <div className='bodyGradient min-h-screen flex justify-center items-center'>
            <div className="max-w-xl mx-auto subHeadingText">
                <h1 className="text-4xl font-bold mb-6 text-center headingText">Contact Us</h1>
                <p className="mb-8 text-lg text-center">
                    Have questions, suggestions, or need help? Reach out to us below.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 text-sm mb-1">{error}</p>}
                    <div>
                        <label className="block mb-1 font-medium">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-amber-300"
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
                            value={formData.email}
                            className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-amber-300"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Message</label>
                        <textarea
                            className="w-full border border-amber-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring focus:ring-amber-300"
                            placeholder="Your message..."
                            onChange={handleChange}
                            name="message"
                            value={formData.message}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded transition"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-8 text-center text-sm subHeadingText">
                    Or email us directly at:{" "}
                    <a href="mailto:linkify.help@gmail.com" className="text-yellow-300 underline">
                        linkify.help@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;