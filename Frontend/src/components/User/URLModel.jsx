"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { deleteUrl, editUrl, setError, setLoading } from "../../redux/urlSlice"
import { BASE_URL } from "../../constants"
import { Clock } from "lucide-react"

const URLModel = ({ link }) => {
    const dispatch = useDispatch()
    const { _id, originalUrl, shortUrl, clickCount, expiresAt } = link
    const { loading, error } = useSelector((state) => state.urls)

    const [orgUrl, setOrgUrl] = useState(originalUrl)
    const [shUrl, setShUrl] = useState(shortUrl)
    const [editable, setEditable] = useState(false)

    const handleEdit = async () => {
        dispatch(setLoading(true))
        dispatch(setError(null))
        try {
            const res = await axios.put(`${BASE_URL}/api/url/${_id}`, { originalUrl: orgUrl, shortUrl: shUrl })
            const updated = res.data?.url
            console.log(res.data?.message)
            dispatch(editUrl(updated))
            dispatch(setError(null))
            setEditable(false)
        } catch (error) {
            const errMsg = error.response?.data?.message || "URL updating failed."
            dispatch(setError(errMsg))
        } finally {
            dispatch(setLoading(false))
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
            const res = await axios.delete(`${BASE_URL}/api/url/${_id}`)
            console.log(res.data?.message)
            dispatch(deleteUrl(_id))
            dispatch(setError(null))
        } catch (error) {
            const errMsg = error.response?.data?.message || "URL deletion failed."
            dispatch(setError(errMsg))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${BASE_URL}/${shortUrl}`)
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
            <div className="w-full mb-4 border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                </div>
            </div>
        )
    }

    return (
        // <div className="border rounded-lg my-2 sm:my-0 shadow-sm w-full sm:w-1/2 md:w-1/3">
        <div className="flex flex-col rounded-lg hover:shadow-2xl shadow-gray-900 p-2 shadow-md transition-all">
            {/* {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )} */}

            <div className="p-4 pb-2 border-b border-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-100">Shortened URL</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                        <Clock className="w-3.5" />
                        {formatDate(expiresAt)}
                    </span>
                </div>
            </div>

            <div className="grow p-4 space-y-4">
                {editable ? (
                    <>
                        <div className="space-y-2">
                            <label htmlFor="orgUrl" className="block text-sm font-medium text-white">
                                Original URL
                            </label>
                            <input
                                id="orgUrl"
                                type="url"
                                value={orgUrl}
                                onChange={(e) => setOrgUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="shUrl" className="block text-sm font-medium text-white">
                                Short URL
                            </label>
                            <input
                                id="shUrl"
                                type="text"
                                value={shUrl}
                                onChange={(e) => setShUrl(e.target.value)}
                                placeholder="custom-url"
                                className="w-full px-3 py-2 border border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex pt-2">
                        </div>

                    </>
                ) : (
                    <>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-white">Original URL</label>
                            <div className="p-2 bg-gray-50 rounded-md text-sm break-all border border-gray-100">{originalUrl}</div>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-white">Short URL</label>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-50 rounded-md text-sm font-medium flex-1 break-all border border-blue-100">
                                    {`${BASE_URL}/api/url/${shortUrl}`}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    title="Copy to clipboard"
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
                            className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-red-500 disabled:opacity-50"
                        >

                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default URLModel
