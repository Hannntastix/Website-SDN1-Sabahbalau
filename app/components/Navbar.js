import { buttonVariants } from '@/components/ui/button'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const isAdmin = user?.email === process.env.ADMIN_EMAIL

    return (
        <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm'>
            <div className='poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10'>
                <div className='md:flex sm:items-center sm:justify-between'>
                    <div className='text-center sm:text-left'>
                        <a className='flex gap-1 items-center'>
                            <h2 className='text-2xl font-bold flex gap-2 text-slate-700'>
                                SDN 1 <span className='text-green-700 lg:text-blue-700'>Sabahbalau</span>
                            </h2>
                        </a>
                    </div>

                    <div className='mt-4 flex-col gap-4 sm:mt-0 md:flex-row sm:items-center flex'>
                        {user ? (
                            <>
                                {isAdmin ?
                                    <>
                                        <Link href="/dashboard" className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}>
                                            Dashboard
                                        </Link>
                                    </>
                                    : null}
                                <div className='h-8 w-px bg-zinc-200 hidden md:block' />
                                <Link href="/" className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}>
                                    Home
                                </Link>
                                <Link href="/api/auth/logout" className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}>
                                    Sign Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/" className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}>
                                    Home
                                </Link>

                                <Link href='/api/auth/register' className={buttonVariants({
                                    size: 'sm',
                                    variant: 'ghost',
                                })}>
                                    Sign up
                                </Link>

                                <Link href='/api/auth/login' className={buttonVariants({
                                    size: 'sm',
                                    variant: 'ghost',
                                })}>
                                    Sign In
                                </Link>

                                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar