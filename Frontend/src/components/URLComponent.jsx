import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import axios from 'axios';
import { BASE_URL } from "../constants";
import { addUrl, setError, setLoading } from '../redux/urlSlice';
import { showToast } from '../utils/toast';


function URLComponent() {
    const [url, setUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [localError, setLocalError] = useState('');
    const [copyButtonText, setCopyButtonText] = useState('Copy URL');

    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector(state => state.user);
    const [generated, setGenerated] = useState(false)
    const { error } = useSelector(state => state.urls);

    const validateUrl = (inputUrl) => {
        if (!inputUrl.trim()) {
            setLocalError("URL is required.");
            return false;
        }
        if (!validator.isURL(inputUrl)) {
            setLocalError("Please enter a valid URL.");
            return false;
        }
        setLocalError('');
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
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Shortening failed.";
            setLocalError(errorMsg);
            dispatch(setError(errorMsg));
        } finally {
            dispatch(setLoading(false));
        }
    };


    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopyButtonText("Copied!");
            showToast({
                type: "success",
                message: "URL copied to clipboard.",
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to copy URL.";
            showToast({
                type: "error",
                message: errorMsg,
            });
        }
    };

    return (
        <div>
            <div className='bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg shadow-gray-700 sm:w-2/3 mx-2 rounded-lg sm:py-10 sm:px-10 px-5 py-5 sm:mx-auto'>
                <div className="">
                    <label htmlFor="url" className="block text-3xl mb-4 py-1 font-medium headingText">Paste your long link here</label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        placeholder="e.g. https://sample.com/my-long-url"
                        onChange={(e) => setUrl(e.target.value)}
                        className="block w-full rounded-md bg-amber-50 px-3 py-2.5 text-base text-amber-700 placeholder:text-gray-400  focus:outline-none focus:ring focus:ring-amber-300 sm:text-sm"
                    />
                </div>

                {isAuthenticated && (
                    <div className="mt-2">
                        <label htmlFor="customUrl" className="block text-lg mb-2 font-semibold headingText">
                            Custom URL (optional)
                        </label>
                        <input
                            type="text"
                            id="customUrl"
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            placeholder="e.g. my-awesome-link"
                            className="block w-full rounded-md bg-amber-50 px-3 py-2.5 text-base text-amber-700 placeholder:text-gray-400  focus:outline-none focus:ring focus:ring-amber-300 sm:text-sm"
                        />
                    </div>
                )}

                {localError && <p className="text-red-400 text-sm mt-2">{localError}</p>}
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                <button
                    className="mt-4 btn"
                    onClick={handleShortUrl}
                >
                    Shorten URL
                </button>

                {generated && <div className="mt-2">
                    <label htmlFor="customUrl" className="block text-lg mb-2 font-semibold headingText">
                        Shorten URL
                    </label>

                    <div className='flex '>
                        <input
                            type="text"
                            id="shortUrl"
                            value={shortUrl}
                            contentEditable='false'
                            readOnly
                            className="block w-9/12 rounded-l bg-amber-100 px-3 py-3 text-base text-amber-700 sm:text-sm outline-none"
                        />
                        <button
                            onClick={handleCopyUrl}
                            className={`px-4 py-1 border-l-2 border-l-amber-400 font-bold text-amber-800 cursor-pointer transition duration-400 ease-in-out rounded-r w-3/12        ${copyButtonText === "Copied!" ? 'bg-amber-400' : 'bg-amber-200 '}`}
                        >
                            {copyButtonText}
                        </button>
                    </div>
                </div>}
            </div >
        </div>
    );
}

export default URLComponent;
