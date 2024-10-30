// components/layout/MainLayout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-gray-800">
                                    A.I.D.E Framework
                                </Link>
                            </div>
                            <div className="hidden md:ml-6 md:flex md:space-x-8">
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/awareness"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    Awareness
                                </Link>
                                <Link
                                    href="/pdf-manager"
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                                >
                                    PDF Manager
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 rounded-full"
                                        }
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}