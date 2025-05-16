import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import URLComponent from '../URLComponent';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { setError, setLoading, setUrls } from '../../redux/urlSlice';
import URLModel from './URLModel';

function Dashboard() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);
    const { urls, loading, error } = useSelector(state => state.urls);
    const [links, setLinks] = useState([])

    const fetchUrls = async () => {
        dispatch(setLoading(true))
        dispatch(setError(null));

        try {
            const res = await axios.get(`${BASE_URL}/api/user/dashboard`, {
                withCredentials: true
            });
            const data = res.data?.urls;
            setLinks(data)
            dispatch(setUrls(data))
            dispatch(setError(null));
        } catch (error) {
            const errMsg = error.response?.data?.message || "urls fetch failed.";
            dispatch(setError(errMsg))
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUrls();
        }
    }, [isAuthenticated])

    return (
        <div className='bg-purple-400 py-10'>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <URLComponent />

            <div className='px-30 py-10'>
                <h2 className="text-xl font-bold">Your Short URLs</h2>
                <div className='flex '>
                    {urls.map(link => (
                        <URLModel link={link} />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default Dashboard