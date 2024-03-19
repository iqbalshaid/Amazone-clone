import { createContext, useEffect, useState } from "react";
import axios from "axios";
const userType = createContext();
const UserContext =  ({children})=>{
    const [userId,setUserId] = useState('');
    useEffect(()=>{
    axios.get("http://10.1.0.0:8000/profiles").then((res)=>{
        console.log(res.data);
        setUserId(res.data);
    }).catch((err)=>{
        console.log("error get from the profiles",err);
    })},[])
    return(
        <userType.Provider value={{userId,setUserId}}>{children}</userType.Provider>
    )

}
export {UserContext,userType};