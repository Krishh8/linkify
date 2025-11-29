// import { Facebook, FacebookIcon, Instagram, Linkedin, Twitter } from 'lucide-react'

function Footer() {
    return (
        <div className='bg-gradient-to-b from-gray-900 to-black text-yellow-300 md:px-20 px-6 py-4 items-center'>
            <div className='flex md:flex-row gap-2 flex-col items-center justify-between'>
                <p className='font-bold text-3xl logoText'> linkify</p>
                <p className='flex-wrap'>© 2025 Linkify | Handmade in Surat City, Gujarat, India, and all over the world.</p>
                {/* <div className='flex gap-4'><Facebook /><Linkedin /><Twitter /><Instagram /></div> */}
            </div>
        </div>
    )
}

export default Footer
