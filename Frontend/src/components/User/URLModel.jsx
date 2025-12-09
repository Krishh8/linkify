import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteUrl, editUrl, setError, setLoading } from "../../redux/urlSlice";
import { BASE_URL } from "../../constants";
import { Clock, Copy } from "lucide-react";
import URLModelSkeleton from "./URLModelSkeleton";
import { showToast } from "../../utils/toast";

function URLModel({ link }) {
    const dispatch = useDispatch();
    const { _id, originalUrl, shortUrl, clickCount, expiresAt } = link;
    const { loading } = useSelector((state) => state.urls);

    const [orgUrl, setOrgUrl] = useState(originalUrl)
    const [shUrl, setShUrl] = useState(shortUrl)
    const [editable, setEditable] = useState(false)

    const handleEdit = async () => {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            const res = await axios.put(`${BASE_URL}/api/url/${_id}`, { originalUrl: orgUrl, shortUrl: shUrl }, { withCredentials: true });
            const updated = res.data?.url;
            dispatch(editUrl(updated));
            dispatch(setError(null));
            setEditable(false);
            showToast({
                type: "success",
                message: "URL updated successfully.",
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || "URL updating failed.";
            dispatch(setError(errorMsg));
            showToast({
                type: "error",
                message: errorMsg,
            });
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleMakeEditable = () => {
        setEditable(true)
    }

    const handleCancel = () => {
        setOrgUrl(originalUrl)
        setShUrl(shortUrl)
        setEditable(false)
    }

    const handleDelete = async () => {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            await axios.delete(`${BASE_URL}/api/url/${_id}`, { withCredentials: true });
            dispatch(deleteUrl(_id));
            dispatch(setError(null));
            showToast({
                type: "success",
                message: "URL deleted successfully.",
            });
        } catch (err) {
            const errorMsg = err.response?.data?.message || "URL deletion failed.";
            dispatch(setError(errorMsg));
            showToast({
                type: "error",
                message: errorMsg,
            });
        } finally {
            dispatch(setLoading(false));
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "No expiration"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading) {
        return (
            <URLModelSkeleton />
        )
    }

    const handleCopyUrl = async (shortUrl) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
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
        // <div className="border rounded-lg my-2 sm:my-0 shadow-sm w-full sm:w-1/2 md:w-1/3">
        <div className="flex flex-col rounded-lg hover:shadow-2xl shadow-gray-900 p-2 shadow-md transition-all">
            {/* {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )} */}

            <div className="p-4 pb-2 border-b border-0 border-yellow-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-yellow-200">Shortened URL</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-gray-800 border">
                        <Clock className="w-3.5 text-gray-900" />
                        {formatDate(expiresAt)}
                    </span>
                </div>
            </div>

            <div className="grow p-4 space-y-4">
                {editable ? (
                    <>
                        <div className="space-y-2">
                            <label htmlFor="orgUrl" className="block text-sm font-medium text-yellow-300">
                                Original URL
                            </label>
                            <input
                                id="orgUrl"
                                type="url"
                                value={orgUrl}
                                onChange={(e) => setOrgUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="shUrl" className="block text-sm font-medium text-yellow-300">
                                Short URL
                            </label>
                            <input
                                id="shUrl"
                                type="text"
                                value={shUrl}
                                onChange={(e) => setShUrl(e.target.value)}
                                placeholder="custom-url"
                                className="w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-white"
                            />
                        </div>
                        <div className="flex pt-2">
                        </div>

                    </>
                ) : (
                    <>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-yellow-300">Original URL</label>
                            <div className="p-2 bg-gray-50 rounded-md text-sm break-all border border-gray-100">{originalUrl}</div>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-yellow-300">Short URL</label>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-50 rounded-md text-sm font-medium flex-1 break-all border border-blue-100">
                                    {`${BASE_URL}/api/url/${shortUrl}`}
                                </div>
                                <button
                                    onClick={() => handleCopyUrl(`${BASE_URL}/api/url/${shortUrl}`)}
                                    title="Copy to clipboard"
                                    className="p-2 border border-amber-500 rounded-md bg-amber-400 hover:bg-amber-500 transition-colors"
                                >
                                    <Copy size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-300 text-gray-800">
                                {clickCount} {clickCount === 1 ? "click" : "clicks"}
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-between gap-2 p-2 border-t border-0 ">
                {editable ? (
                    <>
                        <button
                            onClick={handleEdit}
                            disabled={loading}
                            className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset- focus:ring-blue-500 disabled:opacity-50"
                        >

                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50"
                        >

                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleMakeEditable}
                            disabled={loading}
                            className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50"
                        >

                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-red-400 disabled:opacity-50"
                        >

                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default URLModel;
