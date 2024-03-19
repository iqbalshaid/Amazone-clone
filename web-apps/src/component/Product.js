import React from "react";
import { addToCart } from "../redux/CartReducer";
import { useState } from "react";
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { UseDispatch, useDispatch } from "react-redux";
import StarHalfIcon from '@mui/icons-material/StarHalf';
const Product = ({item})=>{
    const dispatch = useDispatch();
    const [addedToCart,setAddedToCart] = useState(false);
    const addItemToCart = (item)=>{
        setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(()=>{
        setAddedToCart(false);
    },60000)
    }
    return (
        <>     
        <button className="mx-16 my-20 bg-white">
            <img className="w-full h-[150px] bg-white" src = {item.image} alt=""/>
            <h2 className="mt-5 w-40 bg-white text-center">{item?.title}</h2>
            <div className="mt-2 flex-row items-center justify-between">
                <h4 className="text-lg font-bold">₹{item?.price}</h4>
                <div className="flex items-center justify-between">
                <h4 className="text-[#FFC72C] font-bold"><StarBorderPurple500Icon /><StarBorderPurple500Icon /><StarBorderPurple500Icon /><StarBorderPurple500Icon /><StarHalfIcon /></h4>
                <h4 className="text-[#FFC72C] font-bold">{item?.rating?.rate}</h4>
                </div>
            </div>
            <button onClick={()=>addItemToCart(item)} className="bg-[#FFC72C] p-3 rounded-3xl justify-center items-center mx-5 my-5">
                {addedToCart?(
                    <div>
                        <h2 className="text-red-500 text-lg font-bold">Added To Cart</h2>
                    </div>
                ):(
                    <div>
                        <h2 className="text-[#00CED1] text-lg font-bold">Add To Cart</h2>
                    </div>
                )}
            </button>
        </button>
        </>
    )
}
export default Product;