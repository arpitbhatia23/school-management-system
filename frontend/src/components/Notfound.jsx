import React from 'react';
import { useRouteError } from 'react-router-dom';

const Notfound = () => {
  const error = useRouteError();
  if (error?.status === 404) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <img src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif" />
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>

        <p className="mt-2">
          Sorry, the page you're looking for doesn't exist. Try navigating back
          to the homepage.
        </p>
        <a
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <img src="https://www.bing.com/th/id/OGC.fc23cb99f0c53e41df4e8bf0dc382982?pid=1.7&rurl=https%3a%2f%2fwww.storypick.com%2fwp-content%2fuploads%2f2021%2f04%2fcid2.gif&ehk=PXQEa%2fmF11DYg5cCNJB1E3VCeskbXN3NivSIuOgue4Q%3d" />
        <h1 className="text-4xl font-bold">{error.message}</h1>

        <p className="mt-2">kuch to gadbad hai daya</p>
        <a
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    );
  }
};

export default Notfound;
