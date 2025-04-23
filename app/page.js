import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Form Rating Platform
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <div className="bg-blue-50 rounded-lg p-6 text-center hover:shadow-xl transition-all">
            <div className="mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-blue-600"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Admin Portal
            </h2>
            <p className="text-gray-600 mb-6">
              Create and manage forms with multiple pages
            </p>
            <Link 
              href="/admin"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
            >
              Go to Admin
            </Link>
          </div>

          {/* Responder Section */}
          <div className="bg-green-50 rounded-lg p-6 text-center hover:shadow-xl transition-all">
            <div className="mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-green-600"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              Responder View
            </h2>
            <p className="text-gray-600 mb-6">
              Browse and respond to available forms
            </p>
            <Link 
              href="/respond"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors inline-block"
            >
              Respond to Forms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}