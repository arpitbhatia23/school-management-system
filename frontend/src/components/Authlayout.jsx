import React, { useEffect, useState } from 'react'
import {useSelector} from  'react-redux'
import {useNavigate } from 'react-router-dom'
export default function Protected ({children,Authentication=true}) {
    const navigate =useNavigate()
    const [loader,setloader]=useState(true)
    const userdata=useSelector(state=>state.auth.userData)
   console.log(userdata)
    const authStatus =useSelector (state=>state.auth.status )
    console.log(authStatus)
    useEffect(()=>{
    if (Authentication && authStatus!== Authentication){
      console.log(Authentication && authStatus!== Authentication)
        navigate('/login')
    }else if (!Authentication && authStatus !== Authentication ){
         if (userdata.role==="admin") {
            navigate("/")
         }
         if(userdata.role==="student") {
            navigate("/studentdashboard")
                       
         }
         if(userdata.role==="teacher"){
            navigate('/teacherdashboard')

         }
    }
    setloader(false)
    },[authStatus,navigate,Authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}