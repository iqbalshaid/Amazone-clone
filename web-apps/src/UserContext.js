import React, { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
const userType = createContext();
const UserContext = ({children})=>{
const [userId,setUserId] = useState();
const fetchData = async ()=>{
    try{
   const data = localStorage.getItem("userId");
    setUserId( data);
    }
    catch(err){
        console.log("error from the backend");
    }
}
useEffect(()=>{
    fetchData();
},[])
return (
    <userType.Provider value={{userId,setUserId}}>{children}</userType.Provider>
)
}
export {UserContext,userType};