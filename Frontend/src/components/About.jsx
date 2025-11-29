import { aboutData } from '../constants'
import Box from './Box'

function About() {
    return (
        <div className='bodyGradient min-h-screen flex-col justify-center items-center'>
            <div className="max-w-3xl p-5 sm:mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-white">About<span className='logoText'> Linkify</span></h1>
                <p className="mb-4 text-lg text-gray-200">
                    <strong>Linkify</strong> is a powerful URL shortening platform that transforms long, clunky links into short, shareable ones. Whether you're sharing on social media, texting a friend, or embedding a link in your blog, Linkify makes it clean and simple.
                </p>
                <p className="mb-4 text-lg text-gray-200">
                    Once logged in, users can create custom short URLs, track how many times each link has been clicked, and manage (edit or delete) their URLs at any time.
                </p>
                <p className="mb-4 text-lg text-gray-200">
                    Our mission is to simplify the way you share links while providing useful analytics and full control over your short links.
                </p>
                <p className="text-lg text-gray-200">
                    Start shortening your URLs with Linkify — fast, simple, and powerful.
                </p>
            </div>

            <div className='px-4 py-6 sm:px-8 sm:py-8 md:px-12 lg:px-20 xl:px-32 2xl:px-64 grid sm:grid-cols-2 md:grid-cols-3 gap-12'>
                {aboutData.map(box => <Box key={box.id} box={box} />)}
            </div>


        </div>
    )
}

export default About