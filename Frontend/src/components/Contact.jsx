import React from 'react'

function Contact() {
    return (
        <div className='bodyGradient min-h-screen'>
            <div className="max-w-xl mx-auto text-white">
                <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
                <p className="mb-8 text-lg text-center text-gray-200">
                    Have questions, suggestions, or need help? Reach out to us below.
                </p>

                <form className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">Your Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Your Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Message</label>
                        <textarea
                            className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Your message..."
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