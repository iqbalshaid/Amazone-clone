import React, { useContext } from "react"
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/Navbar";
import { useDispatch } from "react-redux";
import { userType } from "../UserContext";
const Profile = ()=>{
    const dispatch = useDispatch();
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const {userId} = useContext(userType);
    const logoutn = () => {
        localStorage.removeItem("user");
        navigate("/");
      };
     
      useEffect(()=>{
        const fetchUserProfile = async ()=>{
           
            try{
                const res = await axios.get(`http://127.0.0.1:8000/profile/${userId}`);
                const user = res.data;
                setUser(user);
            }
            catch(err){
                console.log("error",err.message);
            }
        
        };
        fetchUserProfile();
      },[userId])
      useEffect(()=>{
        const fetchOrders = async ()=>{
            
            try{
                const res =  await axios.get(`http://127.0.0.1:8000/orders/${userId}`);
                const orders = res.data.orders;
                setOrders(orders);
                setLoading(false);
            }
            catch(err){
                console.log("error",err.message);
            }
        }
        
        fetchOrders();
      },[userId])
    return(
        <>
        <NavBar />
        <div className="p-5 mt-28 flex-1 bg-white">
        <h1 className="text-[20px] font-bold">Welcome{user?.name}</h1>
        <div className="flex items-center gap-10 mt-5">
            <button className="p-5 bg-[#E0E0E0] rounded-3xl flex-1">
                <h2 className="text-center">Your Orders</h2>
            </button>
            <button className="p-5 bg-[#E0E0E0] rounded-3xl flex-1">
                <h2 className="text-center">Your Account</h2>
            </button>

        </div>
        <div className="flex items-center gap-10 mt-6">
        <button className="p-5 bg-[#E0E0E0] rounded-3xl flex-1">
                <h2 className="text-center">Buy Again</h2>
            </button>
            <button onClick={logoutn} className="p-5 bg-[#E0E0E0] rounded-3xl flex-1">
                <h2 className="text-center">LogOut</h2>
            </button>

        </div>
        <div>
            {loading ? (
                <h3>Loading...</h3>
            ):orders.length > 0 ? (orders.map((order)=>(
                <button className="flex items-center justify-center mt-8 p-7 rounded-3xl border-3 mx-5 border-[#d0d0d0]" key={order._id}>
                    {order.products.slice(0,1)?.map((product)=>(
                        <div className="my-10" key={product._id}>
                            <img  className = "w-52 h-52" src = {product.image} alt="" />
                        </div>

                    ))}
                </button>
            ))) : (
                <h2 className="text-center text-3xl font-medium">No Orders Found</h2>
            )}
        </div>
        </div>
        </>
    )
}
export default Profile;