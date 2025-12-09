import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import URLComponent from '../URLComponent';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { setError, setLoading, setUrls } from '../../redux/urlSlice';
import URLModel from './URLModel';
import URLModelSkeleton from './URLModelSkeleton';

function Dashboard() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);
    const { urls, loading, error } = useSelector(state => state.urls);


    const fetchUrls = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await axios.get(`${BASE_URL}/api/user/dashboard`, {
                withCredentials: true
            });
            const data = res.data?.urls;
            dispatch(setUrls(data));
            dispatch(setError(null));
        } catch (err) {
            const errorMsg = err.response?.data?.message || "urls fetch failed.";
            dispatch(setError(errorMsg));
            dispatch(setUrls([]));
        }
        finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && urls.length === 0) {
            fetchUrls();
        }
    }, [isAuthenticated, urls.length, fetchUrls]);


    return (
        <div className='bodyGradient py-10 px-4 min-h-screen'>
            <div className='mb-20'>
                <URLComponent />
            </div>

            {(loading || urls.length > 0 || error) && (
                <div className='p-3 sm:px-6 sm:py-10 md:mx-5 lg:mx-10 rounded-md bg-gradient-to-br from-gray-800 to-gray-700 shadow-md shadow-amber-700'>
                    <h2 className="text-3xl font-bold mb-4 text-amber-400">Your Short URLs</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-md">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                            {[...Array(6)].map((_, index) => (
                                <URLModelSkeleton key={index} />
                            ))}
                        </div>
                    ) : urls.length > 0 ? (
                        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                            {urls.map((link, index) => (
                                <URLModel key={link._id || index} link={link} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-amber-200 text-lg">No URLs yet. Create your first shortened URL above!</p>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default Dashboard;