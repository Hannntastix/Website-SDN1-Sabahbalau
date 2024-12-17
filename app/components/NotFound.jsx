"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
            <h1 className="text-center font-bold text-3xl text-blue-800">Please Log In First! or refresh the website</h1>
            <p className="text-xl text-gray-600 text-center">
                Oops! The page you are looking for does not exist.
            </p>
            <img
                src="/assets/404.png"
                alt="Not Found Illustration"
                className="w-80 mb-8"
            />
        </div>
    );
}
