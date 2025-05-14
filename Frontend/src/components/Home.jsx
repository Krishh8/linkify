import React from 'react'
import ShortUrl from './ShortUrl'

function Home() {
    return (
        <div className='py-3 px-2 sm:px-12'>
            <p className='sm:text-4xl text-3xl font-medium text-center mb-1'>Shorten, Share, and Track Your Links - Instantly.</p>
            <p className='sm:text-xl text-lg text-center'>Linkify is a free and easy-to-use URL shortener that helps you simplify long links, track clicks, and manage your URLs in one place.
            </p>

            <ShortUrl />
        </div>
    )
}

export default Home