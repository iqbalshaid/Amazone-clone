import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userType } from "../UserContext";
function AddAddress() {
  const navigate = useNavigate();
   const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [flat,setFlat] = useState('');
  const [area,setArea] = useState('');
  const [landmark,setLandMark] = useState('');
  const [postalcode,setPostalCode] = useState('');
  const {userId} = useContext(userType);
  async function addaddress(ev) {
    ev.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/address', {
        userId,
       name,
       mobile,
       flat,
       area,
       landmark,
       postalcode
        
      });
      alert('Registration successful. Now you can log in');
      setName("");
      setMobile("");
      setArea("");
      setFlat("");
      setLandMark("");
      setPostalCode("");
      setTimeout(()=>{
        navigate("/home")
       },500)}
     catch (e) {
      alert('Your address is not added. Please try again later');
    }
  }
  return (
    <div className=" h-full bg-[url(https://www.solutions4ecommerce.com/wp-content/uploads/2018/01/ECommerce_Illustration_.png)]">
  
  
    <div className="mt-0 grow flex items-center justify-around">
    
      <div className="mb-4">
      <img className="text-center" src = "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" alt=""/>
        <h1 className="text-4xl text-center mb-2 text-amber-700">Add a New Addess</h1>
        <form className="max-w-md mx-auto" onSubmit={addaddress}>
      
                  <h1 className="my-1 text-xl text-amber-700">Full Name (first and Last Name)</h1>
          <input type="text"  className="text-black text-xl font-medium"
                 placeholder="Enter your Name"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
                   <h1 className="my-1 text-xl text-amber-700">Mobile No.</h1>
          <input type="number"  className="text-black text-xl font-medium"
                 placeholder="Enter your Mobile No."
                 value={mobile}
                 onChange={ev => setMobile(ev.target.value)} />
                   <h1 className="my-1 text-xl text-amber-700">Flat,House No.,Building,Company</h1>
          <input type="text"  className="text-black text-xl font-medium"
                 placeholder=""
                 value={flat}
                 onChange={ev => setFlat(ev.target.value)} />
                   <h1 className="my-1 text-xl text-amber-700">Area,Street,Sector,village</h1>
          <input type="text"  className="text-black text-xl font-medium"
                 placeholder=""
                 value={area}
                 onChange={ev => setArea(ev.target.value)} />
                   <h1 className="my-1 text-xl text-amber-700">LandMark</h1>
          <input type="text"  className="text-black text-xl font-medium"
                 placeholder=""
                 value={landmark}
                 onChange={ev => setLandMark(ev.target.value)} />
                 <h1 className="my-1 text-xl text-amber-700">PinCode</h1>
          <input type="number"  className="text-black text-xl font-medium"
                 placeholder="Enter Your Pincode"
                 value={postalcode}
                 onChange={ev => setPostalCode(ev.target.value)} />
          
                  
          <button className="primary my-1">Add Address</button>
         
        </form>
      </div>
      
    </div>
    </div>
  );
}
export default AddAddress ;