import React from "react";
import { addToCart } from "../redux/CartReducer";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useRef } from "react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../component/Navbar";
import { useLocation } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect } from "react";

const ProductInfo = ()=>{
    const location = useLocation();
    const {title,price,oldPrice,carouselImages,offer,color,size,item} = location.state || {};
    
    const dispatch = useDispatch();
    const width = useRef(window.innerWidth)
    //console.log(width);
    const height = (width*100)/100;
 const [addedToCart,setAddedToCart] = useState(false);
    const cart = useSelector((state)=>state.cart.cart);
    const addedItemToCart = (item)=>{
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(()=>{
            setAddedToCart(false);
        },6000)
    }
    const [currentImage, setCurrentImage] = useState(0);

    // Function to go to the next image
    const slideStyle = {
      backgroundImage: `url(${carouselImages[currentImage]})`,
    };
    const nextSlide = () => {
      setCurrentImage((prevIndex) =>
        (prevIndex+1)%carouselImages.length
      );
    };
  
    // Function to go to the previous image
    const prevSlide = () => {
      setCurrentImage((prevIndex) =>
        (prevIndex-1+carouselImages.length)%carouselImages.length
      );
    };
  
    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     nextSlide();
    //   }, 5000); // Change the interval as needed (in milliseconds)
  
    //   return () => clearInterval(intervalId);
    // }, []);
      return (
<> 
<NavBar />

<div className="mt-28 flex items-center justify-center bg-[#00CED1]">
            <div className="text-red-700 text-5xl">         <SearchIcon /></div>
 
        <input  className = "bg-white border-4 rounded-3xl my-2 text-2xl text-black px-36 py-3 mx-5 max-sm:px-0 max-sm:mx-0" placeholder="Enter Your Search"/>
        
        <div className="text-red-700 text-5xl">
        <MicNoneIcon/></div>
        </div>
              <div className="flex flex-col justify-center mt-5">
              {/*yaha jo map function banraha hai usko update marna hai*/}
        
              <div className="mt-8  bg-center  bg-cover w-full h-[900px]" style={slideStyle} aria-label={`Slide ${currentImage}`}>
          <div className="items-center">
            <div className="flex items-center justify-around">
              <div className="badge bg-red-600 rounded-full p-4">
                <h3 className="text-white font-semibold text-xl">{offer}</h3>
              </div>
              <div className="badge bg-gray-500 rounded-full p-4">
                <FavoriteIcon />
              </div>
            </div>
            </div>
        </div>
        <div className="text-center mt-4">
          <button className="p-5 bg-[#00CED1] mx-3 text-white text-xl font-bold rounded-tl-[90%] rounded-bl-[90%]" onClick={prevSlide}>Prev</button>
      <button className="p-5 bg-[#00CED1] mx-3 text-white text-xl font-bold rounded-tr-[90%] rounded-br-[90%]" onClick={nextSlide}>Next</button>
      </div>
        </div>
        <div className="p-5 text-center">
            <h3 className="text-2xl font-medium">{title}</h3>
            <p className=" text-center text-black text-2xl font-semibold">oldPrice:-{oldPrice}</p>
        <p className=" text-center text-black text-2xl font-semibold">Offer:-{offer}</p>

            
        </div>
        <h3 className="text-2xl text-center font-semibold">New Price:-{price}</h3>
            <h3 className="text-2xl text-center font-bold">Color:{color}</h3>
            
        
        <p className="mt-2 text-black text-2xl text-center font-semibold">Size:-{size}</p>
        <div className="p-5 text-center">
            <h3 className="text-2xl font-semibold">Total :₹{price}</h3>
            <h3>FREE Delivery Tomorrow By PM.order within 10hrs 30min</h3>
            <div className=" flex  my-5 items-center  justify-center gap-6">
           <div className="text-3xl text-black"><LocationOnIcon /></div>
           <h3 className="text-2xl font-medium">Delivered To Shahid - Raipur</h3>
            </div>
        </div>
       
        <h2 className="text-green-500 mx-8 font-medium text-center">IN Stock</h2>
        <div className="flex items-center justify-center gap-4">
        <button onClick={()=>addedItemToCart(item)} className="bg-[#FFC72C] p-5 rounded-3xl flex justify-center items-center
            mx-5 my5">
                {addedToCart?(
                    <div>
                        <h3>Added To Cart</h3>
                    </div>
                ):(
                    <div>
                        <h3>Add To Cart</h3>
                    </div>
                )}
            </button>
            <button className="bg-[#FFAC1C] p-5 rounded-3xl  justify-center
            items-center mx-5 my-5">
                <h3>Buy Now</h3>
            </button>
            </div>
            
</>
    )
}
export default ProductInfo;