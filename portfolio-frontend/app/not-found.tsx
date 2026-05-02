import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold mb-4 accent-color">404</h1>
        <h2 className="font-heading text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 accent-bg text-white rounded-lg hover:opacity-90 transition font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
