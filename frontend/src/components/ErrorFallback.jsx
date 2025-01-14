import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorFallback = () => {
  const error = useRouteError();
 console.log("mounted")
  if (error?.status && error?.statusText) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
        <h1 className="text-2xl font-bold">
          {error.status} {error.statusText}
        </h1>
        <p className="mt-4">{error.data || "An error occurred on this route."}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="p-6 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="mt-4">{error.message}</p>
        <div className="mt-4">
          <h2 className="font-semibold">Stack trace:</h2>
          <pre className="overflow-auto bg-gray-200 p-4 rounded">{error.stack}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 border border-gray-400 text-gray-700 rounded">
      <h1 className="text-2xl font-bold">Unknown Error</h1>
    </div>
  );
};

export default ErrorFallback;
