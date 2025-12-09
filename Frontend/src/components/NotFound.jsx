import { Link } from 'react-router';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-600 hover:underline">
                Go back home
            </Link>
        </div>
    );
}

export default NotFound;
