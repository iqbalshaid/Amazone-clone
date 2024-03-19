import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    
      await axios.post('http://127.0.0.1:8000/register', {
        name,
        email,
        password,
        
      }).then((res)=>{
      alert('Registration successful. Now you can log in');
      navigate('/');
    }).catch ((e) =>{
      alert('Registration failed. Please try again later');
    }
    )
  }
  return (
    <div className=" h-[100vh] bg-[url(https://www.solutions4ecommerce.com/wp-content/uploads/2018/01/ECommerce_Illustration_.png)]">
  
  
    <div className="mt-0 grow flex items-center justify-around">
    
      <div className="mb-40">
      <img className="text-center" src = "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" alt=""/>
        <h1 className="text-4xl text-center mb-2">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
                 placeholder="Enter your Name"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
                  
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/'}>Login</Link>
          </div>
        </form>
      </div>
      
    </div>
    </div>
  );
}
export default Register;