import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import URLComponent from '../URLComponent';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { setError, setLoading, setUrls } from '../../redux/urlSlice';
import URLModel from './URLModel';

function Dashboard() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);
    const { urls, loading, error } = useSelector(state => state.urls);

    const fetchUrls = async () => {
        dispatch(setLoading(true))
        dispatch(setError(null));

        try {
            const res = await axios.get(`${BASE_URL}/api/user/dashboard`, {
                withCredentials: true
            });
            const data = res.data?.urls;
            dispatch(setUrls(data))
            dispatch(setError(null));
        } catch (error) {
            const errMsg = error.response?.data?.message || "urls fetch failed.";
            dispatch(setError(errMsg))
            dispatch(setUrls([]));
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (isAuthenticated && urls.length === 0) {
            fetchUrls();
        }
    }, [isAuthenticated, urls.length]);

    return (
        <div className='bodyGradient py-10 px-4 min-h-screen'>

            {loading && <p>Loading...</p>}
            {/* {error && <p className="text-red-500">{error}</p>} */}
            <div className='mb-10'>
                <URLComponent />
            </div>

            {/* <div className='p-3 sm:px-30 sm:py-10 rounded-md bg-gradient-to-l from-red-400 to-yellow-400'>
                <h2 className="text-xl font-bold mb-3">Your Short URLs</h2>
                <div className='sm:flex sm:flex-wrap sm:gap-2'>
                    {urls.map(link => (
                        <URLModel link={link} />
                    ))}
                </div>
            </div> */}

            <div className='p-3 sm:px-6 sm:py-10 md:mx-5 lg:mx-10 rounded-md bg-gradient-to-b from-pink-500 to-indigo-400 shadow-2xl shadow-indigo-400'>
                <h2 className="text-xl font-bold mb-4 text-white">Your Short URLs</h2>

                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                    {urls.map((link, index) => (
                        <URLModel key={index} link={link} />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default Dashboard