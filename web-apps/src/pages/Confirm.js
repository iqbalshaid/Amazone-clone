import React, { useContext } from "react";
import axios from "axios";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LensIcon from '@mui/icons-material/Lens';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NavBar from "../component/Navbar";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from '@mui/icons-material/Search';
import { userType } from "../UserContext";
const Confirm = ()=>{
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
      ];
    const navigate = useNavigate();
    const [currentStep,setCurrentStep] = useState(0);
    const [addresses,setAddresses] = useState([]);
    const cart = useSelector((state)=>state.cart.cart);
    const total = cart
    ?.map((item)=>item.price*item.quantity)
    .reduce((curr,prev)=>curr+prev,0);
    const dispatch = useDispatch();
    const [selectedOption,setSelectedOption] = useState("");
    const [selectedAddress,setSelectedAdress] = useState("");
    const [option,setOption] = useState(false);
    const [address,setAddress] = useState("");
   const {userId} = useContext(userType);
    useEffect(()=>{
       
        fetchAddresses()
    },[userId])
    const fetchAddresses = async ()=>{
        try{
            const res = await axios.get(`http://127.0.0.1:8000/${userId}`)
            const addresses = res.data;
            setAddress(addresses);
        }
        catch(err){
            console.log("error",err);
        }
    }
    const handlePlaceOrder = async () => {
        try {
          const orderData = {
            userId: userId,
            cartItems: cart,
            totalPrice: total,
            shippingAddress: selectedAddress,
            paymentMethod: selectedOption,
          };
    
          const response = await axios.post(
            "http://127.0.0.1:8000/orders",
            orderData
          );
          if (response.status === 200) {
            navigate("/order");
            dispatch(cleanCart());
            console.log("order created successfully", response.data);
          } else {
            console.log("error creating order", response.data);
          }
        } catch (error) {
          console.log("errror", error.message);
        }
      };
      const handlePay = ()=>{
        alert("payment are paid successfullly");
        navigate("/home");
      }
    return (
    <>
              <NavBar />
<div className="mt-28 flex items-center justify-center bg-[#00CED1]">
            <div className="text-red-700 text-5xl">         <SearchIcon /></div>
 
        <input  className = "bg-white border-4 rounded-3xl my-2 text-2xl text-black px-36 py-3 mx-5 max-sm:px-0 max-sm:mx-0" placeholder="Enter Your Search"/>
        
        <div className="text-red-700 text-5xl">
        <MicNoneIcon/></div>
        </div>

<div>
    <div className="flex justify-center">
        <div className="flex  flex-row items-center mb-10 justify-between gap-48 max-lg:gap-32 max-sm:gap-8 max-[400px]:gap-3">
       {steps?.map((step,index)=>(
        <div key={index} className=" flex justify-center items-center">
            <div  className={`flex-1 h-6 bg-white ${
    index <= currentStep ? 'bg-green-500' : ''
  }`}>
    <div className={`w-16 h-16 rounded-full bg-[#ccc] flex justify-center items-center ${index < currentStep && 'bg-green-500' }`}>
        {index < currentStep ? (
            <h3 className="text-2xl font-bold text-white ">&#10003</h3>
        ) : (
            <div className="text-2xl font-bold text-white">
                {index +1 }
            </div>
        )}
    </div>
    <h1 className="text-center mt-2 max-sm:text-[10px]">{step.title}</h1>
  </div>
        </div>
       ))}
        </div>
    </div>
    {currentStep === 0 && (
        <div className="mx-10 mt-10 text-center">
            <h2 className="text-2xl font-bold max-sm:text-sm">Select Delivery Address</h2>
            <button>
                {address?.map((item,index)=>(
                    <button className="border-4 border-[#D0D0D0] p-8 flex flex-row items-center gap-5 pb-6 my-4 rounded-6">
                        {selectedAddress && selectedAddress._id===item?._id ? (
                         <div className="text-2xl text-[#008397]"><FiberManualRecordIcon /></div>
                        ):(
                            <div className="text-2xl text-gray-400" onClick={()=>setSelectedAdress(item)}>
                             <LensIcon />
                            </div>
                            
                        )}
                        <div className="flex flex-row items-center gap-5">
                            <h2 className="text-2xl font-bold">{item?.name}</h2>
                            <div className="text-red-500 text-2xl">
                                <AddLocationAltIcon />
                            </div>
                        </div>
                        <h2 className="text-2xl text-[#181818]">{item.houseNo},{item?.landmark}</h2>
                        <h2 className="text-2xl text-[#181818]">{item?.street}</h2>
                        <h2 className="text-2xl text-[#181818]">India, Banglore</h2>
                        <h2 className="text-2xl text-[#181818]">Phone No : {item?.mobileNo}</h2>
                        <h2 className="text-2xl text-[#181818]">pin Code : {item?.postcode}</h2>
                        <div className="flex flex-row items-center gap-8 mt-10">
                            <button className="bg-[#F5F5F5] px-5 py-3 rounded-10 border-3 border-[#D0D0D0]">
                                <h3>Edit</h3>
                            </button>
                            <button className="bg-[#F5F5F5] px-5 py-3 rounded-10 border-3 border-[#D0D0D0]">
                                <h3>Remove</h3>
                            </button>
                            <button className="px-5 py-3 rounded-10 border-3 border-[#D0D0D0] bg-[#F5F5F5]">
                                <h3>Set as Default</h3>
                            </button>
                        </div>
                        <div>
                            {selectedAddress && selectedAddress._id === item?._id && (
                                <button className="bg-[#008397] p-8 rounded-[40px] flex justify-center items-center mt-10" onClick={setCurrentStep(1)}>
                                    <h2 className="text-center text-white">Delivery to this Address</h2>
                                </button>
                            )}
                        </div>
                    </button>
                ))}
            </button>
        </div>
    )}
    {currentStep ===1 && (
        <div className="mx-10">
            <h3 className="text-2xl font-bold">Choose your Delivery Options</h3>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
                {option ? (
                    <div className="text-2xl text-[#008397]"> <FiberManualRecordIcon /></div>
                ):(
                    <div className="text-2xl text-gray-500 " onClick={setOption(true)}><LensIcon /></div>
                )}
                <h2 className="flex-1">
                    <h3 className="text-green-500 font-medium">
                        Tomorrow by 10pm
                    </h3>{""}
                    -FREE Delivery your Prime Membership
                </h2>
            </div>
            <button onClick={setCurrentStep(2)} className="bg-[#FFC72C]
            p-8 rounded-[40px] flex justify-center items-center mt-8">
                <h3>Continue</h3>
            </button>
        </div>
        )}
      {currentStep === 2 && (
        <div className="mx-10">
            <h3 className="text-2xl font-bold">Selct a Payment Method</h3>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
        {selectedOption === 'cash' ? (
            <div className="text-2xl text-[#008397]"><FiberManualRecordIcon/></div>
        ):(
            <div className="text-2xl text-gray-500" onClick={setSelectedOption("cash")}><LensIcon /></div>
        )}
        <h3>Cash on Delivery</h3>
            </div>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
                {selectedOption === 'card'? (<div className="text-2xl text-[#008397]"><FiberManualRecordIcon /></div>):(
                    <div className="" onClick={setSelectedOption("card")}>
                    
                        <LensIcon />
                    </div>
                )}
                <h3>UPI / Credit or Debit Card</h3>
            </div>
            <button className="bg-[#FFC72C]
            p-8 rounded-[40px] flex justify-center items-center mt-8">
                <h3>Continue</h3>
            </button>
            </div>
      )}  
      {currentStep === 3 && selectedOption === 'cash' && (
        <div className="mx-10">
            <h3 className="text-2xl font-bold">Order Now</h3>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
        <div>
            <h3 className="text-2xl font-bold ">Save 5% and Never Run Out</h3>
            <h3 className="text-2xl font-bold text-gray mt-5">Turn on Auto Deliveries</h3>
        </div>
        <div className="text-2xl text-black">
            <KeyboardArrowRightIcon />
        </div>

            </div>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
                <h3>Shipping to {selectedAddress?.name}</h3>
                <div className="flex flex-row items-center justify-between mt-5">
                    <h3 className="text-2xl font-medium text-gray-500">Items</h3>
                    <h3 className="text-2xl font-medium text-gray-500">₹{total}</h3>
                </div>
                <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
                <h3 className="text-2xl font-medium text-gray-500">Delivery</h3>
                <h3 className="text-2xl font-medium text-gray-500">₹0</h3>
            </div>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
                <h3 className="text-3xl font-bold">Order</h3>
                <h3 className="text-[#C60C30] text-2xl font-bold">₹{total}</h3>
            </div>
            </div>
            <div className="flex flex-row items-center bg-white p-5 gap-5
            border-[#D0D0D0] border-2 mt-8">
                <h3 className="text-2xl text-gray-500">Pay With</h3>
                <h3 className="text-2xl font-semibold mt-5">Pay on Delivery (cash)</h3>
            </div>
            <button onClick={handlePlaceOrder} className="bg-[#FFC72C] p-8 rounded-[30px] justify-center items-center mt-10">
                <h3>Place Your Order</h3>
            </button>
            </div>
      )} 
    
</div>
    </>
    )
}
export default Confirm;