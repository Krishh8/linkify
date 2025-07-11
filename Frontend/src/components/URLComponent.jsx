import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import axios from 'axios'
import { BASE_URL } from "../constants"
import { addListener } from '@reduxjs/toolkit';
import { addUrl, setError, setLoading } from '../redux/urlSlice';
import { motion } from 'motion/react';


function URLComponent() {
    const [url, setUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [err, setErr] = useState('');
    const [copyButtonText, setCopyButtonText] = useState('Copy URL');

    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(state => state.user);
    const [generated, setGenerated] = useState(false)
    const { urls, loading, error } = useSelector(state => state.urls);

    const validateUrl = (inputUrl) => {
        if (!inputUrl.trim()) {
            setErr("URL is required.");
            return false;
        }
        if (!validator.isURL(inputUrl)) {
            setErr("Please enter a valid URL.");
            return false;
        }
        setErr('');
        return true;
    };

    const handleShortUrl = async () => {
        if (!validateUrl(url)) return;

        dispatch(setLoading(true));
        dispatch(setError(null)); // Clear previous error

        try {
            const payload = {
                originalUrl: url,
                ...(isAuthenticated && customUrl.trim() && { shortUrl: customUrl.trim() })
            };

            const res = await axios.post(`${BASE_URL}/api/url/shorten`, payload, {
                withCredentials: true
            });

            const resUrl = res.data?.shortUrl || "Couldn't generate short url.";
            setShortUrl(resUrl);

            dispatch(addUrl(res.data?.newUrl));
            setGenerated(true);
            setCopyButtonText("Copy URL");
        } catch (error) {
            const errMsg = error.response?.data?.message || "Shortening failed.";
            setErr(errMsg);
            dispatch(setError(errMsg));
        } finally {
            dispatch(setLoading(false));
        }
    };


    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopyButtonText("Copied!");
            // setTimeout(() => setCopyButtonText("Copy URL"), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };


    return (
        <motion.div whileHover={{ scale: 1.01 }}>
            <div className='bg-gradient-to-b from-blue-400 to-pink-400 shadow-2xl shadow-pink-400 sm:w-2/3 mx-2 rounded-lg sm:py-10 sm:px-10 px-5 py-5 sm:mx-auto text-white'>
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

                {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button
                    className="mt-4 bg-gradient-to-r from-cyan-400 to-emerald-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-semibold px-6 py-2 rounded shadow-md transition-all"
                    onClick={handleShortUrl}
                >
                    Shorten URL
                </button>

                {generated && <div className="mt-2">
                    <label htmlFor="customUrl" className="block text-lg mb-2 font-semibold">
                        Shorten URL
                    </label>

                    <div className='flex '>
                        <input
                            type="text"
                            id="shortUrl"
                            value={shortUrl}
                            contentEditable='false'
                            readOnly
                            className="block w-9/12 rounded-l bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm outline-none"
                        />
                        <button
                            onClick={handleCopyUrl}
                            className={`px-4 py-1 border-l-2 border-l-gray-400 font-bold text-blue-900 cursor-pointer transition duration-400 ease-in-out rounded-r w-3/12        ${copyButtonText === "Copied!" ? 'bg-gray-400 text-white' : 'bg-white hover:bg-gray-400 hover:text-white'}`}
                        >
                            {copyButtonText}
                        </button>
                    </div>
                </div>}
            </div >
        </motion.div>
    );
}

export default URLComponent;
