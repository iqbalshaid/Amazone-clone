import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { UseDispatch } from "react-redux";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../component/Navbar";
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { incrementQuantity,decrementQuantity,removeFromCart } from "../redux/CartReducer";
import AddIcon from '@mui/icons-material/Add';
const Cart = ()=>{
    const cart = useSelector((state)=>state.cart.cart);
    const total = cart?.map((item)=>item.price*item.quantity).reduce((curr,prev)=>curr+prev,0);
    const dispatch = useDispatch();
    const increaseQuantity = (item)=>{
        dispatch(incrementQuantity(item))
    }
    const decreaseQuantity = (item)=>{
        dispatch(decrementQuantity(item))
    }
    const deleteItem = (item)=>{
        dispatch(removeFromCart(item))
    }
    const navigate = useNavigate();
    return (
        <>
          <div className="mt-8 flex-1 bg-white">
          <NavBar />
<div className="mt-28 flex items-center justify-center bg-[#00CED1]">
            <div className="text-red-700 text-5xl">         <SearchIcon /></div>
 
        <input  className = "bg-white border-4 rounded-3xl my-2 text-2xl text-black px-36 py-3 mx-5 max-sm:px-0 max-sm:mx-0" placeholder="Enter Your Search"/>
        
        <div className="text-red-700 text-5xl">
        <MicNoneIcon/></div>
        </div>
        <div className=" flex flex-col items-center justify-center p-10">
            <h3 className="text-2xl font-medium">SubTotal</h3>
            <h3 className="text-2xl font-medium">{total}</h3>
            <h3>EMI Details Available</h3>
            <button onClick={()=>navigate("/confirm")} className="bg-[#FFC72C]
            p-5 rounded-xl justify-center items-center mx-4 mt-8" 
            >
                <h3>Proceed To Buy({cart.length})Items</h3>
            </button>
            <h3 className="bg-[#D0D0D0] h-5 border-4 mt-8"/>
            <div className="mx-10">
                {cart?.map((item,index)=>(
                    <div className="bg-white my-5 border-b-[#f0f0f0] border-4 border-l-0 border-r-0 border-t-0" key={index}>
                    <button className="my-5 flex flex-row justify-between">
                        <img src={item?.image} alt="" className="w-52 h-52"/>
                        <div>
                            <h3 className="w-52 mt-5">{item?.title}</h3>
                            <h3 className="text-3xl font-bold mt-5">{item?.price}</h3>
                            <img src="https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png" alt="" className="w-20 h-20"/>
                            <h3 className="text-green-600">In Stock</h3>
                        </div>
                    </button>
                    <button className="mt-5 mb-4 flex flex-row items-center gap-10">
                        <div className="flex flex-row items-center px-5 py-3 rounded-3xl">
                            {item?.quantity > 1 ? (<button onClick = {()=>decreaseQuantity(item)}
                                className="bg-[#D8D8D8] p-8 rounded-tl-lg rounded-bl-lg"
                            >
                                <div className="text-black text-4xl"><RemoveIcon /></div>
                            </button>):(
                                <button onClick={deleteItem(item)}
                                className="bg-[#D8D8D8] p-7 rounded-tl-xl rounded-bl-xl">
                                    <div className="text-black text-4xl"><DeleteIcon /></div>
                                </button>
                            )}
                            <button className="bg-white px-5 py-3">
                                <h3>{item?.quantity}</h3>
                            </button>
                            <button onClick={increaseQuantity(item)} className="bg-[#D8D8D8] p-5 rounded-tl-xl rounded-bl-xl">
                            <div className="text-black text-xl"><AddIcon /></div>
                            </button>
                        </div>
                        <button onClick={deleteItem(item)} className="bg-white px-3 py-4 rounded-xl border-[#C0C0C0] border-4">
                            <h3>Delete</h3>
                        </button>
                    </button>
                    <button className=" flex flex-row items-center gap-8 mt-6">
                        <button className="bg-white px-3 py-4 rounded-xl border-[#C0C0C0] border-2">
                            <h3>Save For Later</h3>
                        </button>
                        <button className="bg-white px-3 py-4 rounded-xl border-[#C0C0C0] border-4">
                            <h3>See More Like This</h3>
                        </button>
                    </button>
                    </div>
                ))}
            </div>
        </div>
          </div>
        </>
    )
}
export default Cart;