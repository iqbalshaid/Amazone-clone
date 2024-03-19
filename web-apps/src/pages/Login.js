import {Link, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";


import { userType } from "../UserContext.js";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {userId} = useContext(userType);
  const navigate = useNavigate();
  
  async function handleLoginSubmit(ev) {
    
   
    console.log("how  you");
    try {
      const res = await axios.post('http://127.0.0.1:8000/login', {email,password});
       console.log(res.data);
      // localStorage.setItem("userId",res.data.others._id);
        alert('Login successfull1');
       navigate('/home');
     
    //   console.log(data.role);
    //   console.log("sha")
     }
     catch(e){
      
      console.log("something wrong");
     }
      
    }  
  


  return (
    <div className=" h-[100vh] bg-[url(https://www.solutions4ecommerce.com/wp-content/uploads/2018/01/ECommerce_Illustration_.png)]">
    <div className="mt-0 grow flex items-center justify-around">
      <div className="mb-40">
      <img className="text-center" src = "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" alt=""/>
        <h1 className="text-4xl text-center mb-2">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
                          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to="register">Register now</Link>
          </div>
        
        </form>
       
       </div>
    </div>
    </div>
  );
}