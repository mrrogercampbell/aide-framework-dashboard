// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative isolate px-4 pt-10 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-48">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 whitespace-nowrap">
            The A.I.D.E. Framework&trade; Dashboard
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 px-4">
            AI Implementation and Development Environment Framework - A structured approach to implementing AI solutions in your organization.
          </p>
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6">
            <a
              href="/awareness"
              className="rounded-md bg-indigo-600 px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}