import { useRouteError } from "react-router-dom";

const ErrorFallback = () => {
  
  const error = useRouteError();
  console.log("mounted")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
      <p className="mt-2">{error.statusText || error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
};

export default ErrorFallback;
