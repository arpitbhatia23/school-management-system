

import { useEffect, useState } from "react";
import "./App.css";
import { login } from "./store/slice";
import { Toaster } from "./components/ui/toaster";
import {  RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthApi } from "./services/authapi";



import router from "@/router/router";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      const { currentUser } = useAuthApi();
      const res = await currentUser();
      if (res.data.success) {
        dispatch(login(res.data.data));
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [dispatch]);

 

  return (
    <>
      <div className="flex justify-center w-screen min-h-screen">
        <Toaster />
       <RouterProvider router={router}/>
      
        <Toaster/>
      </div>
    </>
  );
}

export default App;
