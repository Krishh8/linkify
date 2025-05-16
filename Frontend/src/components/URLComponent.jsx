import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import validator from 'validator'; // Make sure to install this package: npm install validator

function URLComponent() {
    const [url, setUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [error, setError] = useState('');
    const { user, isAuthenticated } = useSelector(state => state.user);


    const validateUrl = (inputUrl) => {
        if (!inputUrl.trim()) {
            setError("URL is required.");
            return false;
        }
        if (!validator.isURL(inputUrl)) {
            setError("Please enter a valid URL.");
            return false;
        }
        setError('');
        return true;
    };

    const handleShortUrl = async () => {
        if (!validateUrl(url)) return;

        try {
            const payload = {
                originalUrl: url,
                ...(isLoggedIn && customUrl.trim() && { customUrl: customUrl.trim() })
            };

            const res = await axios.post(`${BASE_URL}/api/url/shorten`, payload);

            console.log("Shortened URL:", res.data.shortUrl);
        } catch (error) {
            const errMsg = error.response?.data?.message || "Shortening failed.";
            setError(errMsg);
        }
    };

    return (
        <div className='bg-blue-900 sm:my-10 my-5 sm:w-2/3 mx-2 rounded-lg sm:py-10 sm:px-10 px-5 py-5 sm:mx-auto text-white'>
            <div className="">
                <label htmlFor="url" className="block text-3xl mb-4 font-medium">Paste your long link here</label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    placeholder="e.g. https://sample.com/my-long-url"
                    onChange={(e) => setUrl(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-blue-700 sm:text-sm"
                />
            </div>

            {isAuthenticated && (
                <div className="mt-2">
                    <label htmlFor="customUrl" className="block text-lg mb-2 font-semibold">
                        Custom URL (optional)
                    </label>
                    <input
                        type="text"
                        id="customUrl"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="e.g. my-awesome-link"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-blue-700 sm:text-sm"
                    />
                </div>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
                className="mt-4 bg-white text-blue-900 px-5 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
                onClick={handleShortUrl}
            >
                Shorten URL
            </button>
        </div>
    );
}

export default URLComponent;
