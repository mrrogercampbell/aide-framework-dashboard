// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { Toaster } from 'react-hot-toast';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'A.I.D.E Framework Dashboard',
  description: 'AI Implementation and Development Environment Framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <MainLayout>{children}</MainLayout>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}