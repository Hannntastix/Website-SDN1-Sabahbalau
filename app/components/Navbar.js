import Link from 'next/link'
import React from 'react'

const Navbar = (props) => {
    return (
        <nav className='poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10'>
            <div className='sm:flex sm:items-center sm:justify-between'>
                <div className='text-center sm:text-left'>
                    <a className='flex gap-1 items-center'>
                        <h2 className='text-2xl font-bold flex gap-2'>
                            SDN 1 <span className='text-green-700'>Sabahbalau</span>
                        </h2>
                    </a>
                </div>

                <div className='mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center'>
                    <Link
                        href="/"
                        className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-lg"
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-lg"
                    >
                        Dashboard
                    </Link>
                    <button
                        className='hover:bg-green-700 block rounded-lg bg-green-600 px-7 py-3 text-sm font-medium text-white'
                        type='button'
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar