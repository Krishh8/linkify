import URLComponent from './URLComponent';

function Home() {
    return (
        <div className='bodyGradient py-6 px-3 sm:px-12 min-h-screen flex flex-col justify-center space-y-10'>
            <div className='text-center space-y-3'>
                <p className='sm:text-4xl text-3xl font-semibold headingText'>
                    Shorten, Share, and Track Your Links — Instantly.
                </p>
                <p className='sm:text-xl text-lg subHeadingText'>
                    Linkify is a fast, secure, and reliable URL shortener that helps you turn long links into short, trackable ones — all in one place.
                </p>
                <p className='text-md sm:text-lg subHeadingText'>
                    Create branded short links. No sign-up required.
                </p>
            </div>

            <URLComponent />

            <div className='text-center mt-6 text-sm sm:text-base subHeadingText'>
                🔒 100% secure & private · 🚀 Instant shortening · 📊 Real-time analytics
            </div>
        </div>
    );
}

export default Home;