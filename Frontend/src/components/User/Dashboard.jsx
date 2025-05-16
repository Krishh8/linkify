import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import URLComponent from '../URLComponent';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { setError, setLoading, setUrls } from '../../redux/urlSlice';

function Dashboard() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);
    const { urls, loading, error } = useSelector(state => state.urls);
    const [links, setLinks] = useState([])

    const fetchUrls = async () => {
        try {
            dispatch(setLoading(true))
            const res = await axios.get(`${BASE_URL}/api/user/dashboard`, {
                withCredentials: true
            });
            dispatch(setLoading(false))
            const data = res.data?.urls;
            setLinks(data)
            dispatch(setUrls(data))
            dispatch(setError(""));
        } catch (error) {
            dispatch(setLoading(false))
            const errMsg = error.response?.data?.message || "urls fetch failed.";
            dispatch(setError(errMsg))
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUrls();
        }
    }, [isAuthenticated])
    return (
        <div>
            <p className='text-lg'>User : {user?.email}</p>
            <URLComponent />
            <h2 className="text-xl font-bold">Your Short URLs</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {links.map(link => (
                    <li key={link._id}>{link.originalUrl} - {link.shortUrl}</li>
                ))}
            </ul>
        </div>

    )
}

export default Dashboard