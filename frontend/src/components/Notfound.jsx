import React from 'react'

const Notfound = () => {
  return (
    
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2">
              Sorry, the page you're looking for doesn't exist. Try navigating back to
              the homepage.
            </p>
            <a
              href="/"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Home
            </a>
          </div>
    
    
      
  )
}

export default Notfound
