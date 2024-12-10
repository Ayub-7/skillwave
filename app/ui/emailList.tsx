'use client'
import { addEmail } from "@/app/lib/actions";
import React, { useState } from 'react';


export default function EmailList() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const result = await addEmail(email);
            if (result.success) {
                setMessage('Thank you for joining our waitlist!');
                setEmail('');
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <p className="text-lg mb-2">Stay updated on our launch and future offers:</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-black w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-600 transition-colors whitespace-nowrap disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                </button>
            </form>
            {
                message && (
                    <p className={`mt-2 text-sm ${message.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )
            }
        </div>
    )

}
