import React, { useContext } from "react";
import { useState,useEffect } from "react";
import axios from "axios"
import {useNavigate } from "react-router-dom";
import NavBar from "../component/Navbar";
import { Element } from "react-scroll";
import SearchIcon from '@mui/icons-material/Search';
import MicNoneIcon from '@mui/icons-material/MicNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from "react-redux";
import Product from "../component/Product";
import CloseIcon from '@mui/icons-material/Close';
import Footer from "../component/Footer";
import { userType } from "../UserContext";

const Home = ()=>{
 
    const list = [
        {
          id: "1",
          image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
          name: "Home",
        },
        {
          id: "2",
          image:
            "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
          name: "Deals",
        },
        {
          id: "3",
          image:
            "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
          name: "Electronics",
        },
        {
          id: "4",
          image:
            "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
          name: "Mobiles",
        },
        {
          id: "5",
          image:
            "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
          name: "Music",
        },
        {
          id: "6",
          image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
          name: "Fashion",
        },
        {
            id:"7",
            image:"https://cdn.fcglcdn.com/brainbees/images/products/438x531/15602006a.webp",
            name:"Baby Product"

        },
       
      ];
      const images = [
        "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
      ];
      const deals = [
        {
          id: "20",
          title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
          oldPrice: 25000,
          price: 19000,
          offer: "72% off",
          image:
            "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
            "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
          ],
          color: "Stellar Green",
          size: "6 GB RAM 128GB Storage",
        },
        {
          id: "30",
          title:
            "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
          oldPrice: 74000,
          price: 26000,
          offer: "10% off",
          image:
            "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
            "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
          ],
          color: "Cloud Navy",
          size: "8 GB RAM 128GB Storage",
        },
        {
          id: "40",
          title:
            "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
          oldPrice: 16000,
          offer: "40% off",
          price: 14000,
          image:
            "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
          ],
          color: "Icy Silver",
          size: "6 GB RAM 64GB Storage",
        },
        {
          id: "50",
          title:
            "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
          oldPrice: 12999,
          offer: "30% off",
          price: 10999,
          image:
            "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
          ],
        },
      ];
      const offers = [
        {
          id: "1",
          title:
            "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
          offer: "72% off",
          oldPrice: 7500,
          price: 4500,
          image:
            "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
          ],
          color: "Green",
          size: "Normal",
        },
        {
          id: "2",
          title:
            "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
          offer: "40%",
          oldPrice: 7955,
          price: 3495,
          image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
          ],
          color: "black",
          size: "Normal",
        },
        {
          id: "3",
          title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
          offer: "40%",
          oldPrice: 7955,
          price: 3495,
          image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
          carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
          color: "black",
          size: "Normal",
        },
        {
          id: "4",
          title:
            "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
          offer: "40%",
          oldPrice: 24999,
          price: 19999,
          image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
          carouselImages: [
            "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
          ],
          color: "Norway Blue",
          size: "8GB RAM, 128GB Storage",
        },
      ];
   const [products,setProducts] = useState([]);
   
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = (item) => {
        console.log("hello");
      setIsOpen(!isOpen);
      setSelectedAddress(item);
    };
    
    const [selectedAddress, setSelectedAddress] = useState(null); // Initialize selectedAddress state
    const [addresses, setAddresses] = useState([]);
   
    
    const [currentImage, setCurrentImage] = useState(0);
    const [category,setCategory] = useState("jewelery");
    // const [items, setItems] = useState([
    //   { label: "Men's clothing", value: "men's clothing" },
    //   { label: "jewelery", value: "jewelery" },
    //   { label: "electronics", value: "electronics" },
    //   { label: "women's clothing", value: "women's clothing" },
    // ]);
   
  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);

  };
  const navigate = useNavigate();
useEffect(()=>{
  axios.get("https://fakestoreapi.com/products")
  .then((res)=>setProducts(res.data))
  .catch((err)=>console.log("error in api",err))
},[])
const  Close = ()=>{
  if(selectedAddress!==null){
    setIsOpen(false);
  }
  
}

const {userId} = useContext(userType);

useEffect(()=>{
 
    fetchAddresses();
  }
,[userId]);
// const userId = JSON.parse(localStorage.getItem("user"));
// console.log(userId);
const fetchAddresses = async ()=>{
  try{
  const res = await axios.get(`http://127.0.0.1:8000/address/${userId}`);
  const address = res.data;
  setAddresses(address);
}
catch(err){
console.log("error",err.message);
}
}
    return (
        <>
            <NavBar/>
            <div className="mt-24 flex items-center justify-center">
            <div className="text-gray-400 text-2xl">         <SearchIcon /></div>
 
        <input  className = "bg-white border-0 mt-3 text-2xl text-black px-36 py-3 mx-5 max-sm:px-0 max-sm:mx-0" placeholder="Enter Your Search"/>
        
        <div className="text-red-400 text-2xl">
        <MicNoneIcon/></div>
        </div>
        <div className="bg-[#00CED1] mt-4 flex  flex-row items-center justify-center">
                                
            <button onClick={toggleDropdown} className="text-black bg-[#00CED1] p-2">
            <div className="text-gray-400 text-2xl mx-3"><LocationOnIcon /></div>

          
          <button>
          {selectedAddress ? (       
           <h1 className="text-2xl text-center bg-[#00CED1] text-gray-400 font-extrabold">Deliver To {selectedAddress?.name} - {selectedAddress?.strret}</h1>
            ):(<h1 className="text-2xl text-center bg-[#00CED1] text-gray-400 font-extrabold">Add a Address</h1>
)}  </button>
<div className="text-2xl text-black"><ExpandMoreIcon /></div>
      </button>

      {isOpen && (
        <div
          className="bg-white border rounded mt-2"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            padding: '10px',
          }}
        >
              <div className="mt-5 max-md:mt-16 max-sm:mt-20">
          <div className="flex items-center justify-between mx-5">  
        <h2 className="max-sm:text-[7px]">Choose your Location</h2>
        <div onClick={Close} className="text-2xl font-bold text-black max-sm:text-xs max-sm:mr-0"><CloseIcon /></div>
        </div>
        <p className="max-md:text-xs max-sm:text-[8px]">Select a delivery location to see product availability and delivery options</p>
      </div>
      
      <div className=" flex flex-row overflow-x-auto gap-8">
        {/* already added addresses */}
        {addresses.map((item, index)=> (
          <div
            key={index}
            onClick={() => setSelectedAddress(item)}
            className="w-60 h-60 border-2 border-[#D0D0D0] p-5 justify-center items-center
            gap-5 mr-5 mt-5"
          >
            <div className="flex flex-row items-center gap-5">
              <h3 className="text-2xl font-bold max-md:text-xl max-sm:text-[9px]">
                {item?.name}
              </h3>
              <span  className="text-3xl text-red-500 max-md:text-xl max-sm:text-[9px]">location-pin</span>
            </div>

            <p
            className="w-56 text-2xl items-center overflow-hidden whitespace-nowrap text-ellipsis max-md:text-xl max-sm:text-[9px]">
              {item?.houseNo},{item?.landmark}
            </p>

            <p className="w-56 text-2xl items-center overflow-hidden whitespace-nowrap text-ellipsis max-md:text-xl max-sm:text-[9px]">
              {item?.street}
            </p>
            <p className="w-56 text-2xl items-center max-md:text-xl max-sm:text-[9px]">
              India, Bangalore
            </p>
          </div>
        ))}
        <div
          onClick={() => {
            setIsOpen(false);
            // Navigate to the address page, assuming you have the 'navigation' object
            // navigation.navigate("address");
            navigate("/address")
          }}
          className="w-32 h-32 border-2 border-[#D0D0D0] p-5 justify-center items-center
             mt-5"
        >
          <p className="text-center text-[9px] text-[#0066b2] font-medium max-md:text-[7px] max-sm:text-[7px] cursor-pointer">
            Add an Address or pick-up point
          </p>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex flex-col gap-6">
          <div 
          className="flex flex-row items-center gap-5">
            <span  className="text-3xl text-[#0066b2] max-md:text-xl max-sm:text-[7px]">location-pin</span>
            <p  className="text-[#0066b2] font-normal max-md:text-xs max-sm:text-[7px]">
              Enter an Indian pincode
            </p>
          </div>

          <div className="flex flex-row items-center gap-5">
            <span  className="text-2xl font-normal max-md:text-xl max-sm:text-[7px]">locate-sharp</span>
            <p className="text-[#0066b2] font-normal  max-md:text-xs max-sm:text-[7px]">
              Use My Current location
            </p>
          </div>

          <div className="flex flex-row items-center gap-5">
            <span  className="text-2xl text-[#0066b2] max-md:text-xl max-sm:text-[7px]">earth</span>
            <p  className="text-[#0066b2] font-normal max-md:text-xs max-sm:text-[7px]">
              Deliver outside India
            </p>
          </div>
        </div>
      </div>
        </div>)}
        
        </div>
        <Element className="mt-6">
            {list.map((item)=>(
                <button key={item.id} className="mx-4 max-lg:mx-2  max-md:mx-5 max-sm:mx-5">
                    <img className="w-40 h-20 max-xl:w-32 max-lg:h-11 max-sm:w-24 max-sm:gap-5 max-sm:bg-no-repeat" src = {item.image} alt=""/>
                    <h3 className="text-center text-2xl bg-white font-medium">{item.name}</h3>
                </button>
            ))}
        </Element>
           <div className="flex flex-col justify-center my-10">
          
      <img src={images[currentImage]} alt={`Slide ${currentImage}`} />
      <div className="flex items-center justify-center mt-3">
      <button onClick={prevImage} className="p-5 bg-[#00CED1] mx-3 text-white text-xl font-bold rounded-tl-[90%] rounded-bl-[90%]">Prev</button>
      <button onClick={nextImage} className="p-5 bg-[#00CED1] mx-3 text-white text-xl font-bold rounded-tr-[90%] rounded-br-[90%]">Next</button>
      </div>

           </div> 
           <div className="border-b-8 border-gray-400">
            <h2 className="p-10 text-2xl font-semibold mt-3 text-center ">Trending Deals of the Week</h2>
            <div className="flex-row items-center justify-center flex-wrap ml-8 ">
              {deals.map((item)=>(
                <button key={item.id} 
                onClick={()=>
                  navigate("/productinfo",{
                  state:{
                    id:item.id,
                    title:item.title,
                    oldPrice:item?.oldPrice,
                    price:item?.price,
                    carouselImages:item.carouselImages,
                    offer:item?.offer,
                    color:item?.color,
                    size:item.size,
                                        item:item,
                  },})

                } className="ml-8">
                <img className="w-full h-full" src = {item.image} alt=""/>
                </button>
              ))}
            </div>
           </div>
           <div className="border-b-8 border-gray-400 ">
            <h2 className="p-10 text-2xl font-semibold mt-3 text-center ">Today Deals</h2>
            <div>
              {offers.map((item,index)=>(
                <button key={index}
                onClick={()=>
                navigate(
                "/productinfo",{
                  state:{
                    id:item.id,
                    title:item.title,
                    oldPrice:item?.oldPrice,
                    price:item?.price,
                    carouselImages:item.carouselImages,
                    offer:item?.offer,
                    color:item?.color,
                    size:item.size,
                                        item:item,
                }})} className=" my-1 max-lg:mx-4  max-lg:my-4">
               <img src={item?.image} className=" w-full h-full gap-2 max-lg:w-48 max-lg:h-32 max-lg:items-center" alt=""/>
               
               <h3 className="text-center text-2xl bg-red-500 gap-2 text-[#00CED1] rounded-xl font-medium">Upto {item.offer}</h3>
               
                </button>
              ))}
            </div>
           </div>
<div className="mt-3 text-center">
<select className="border-8 border-[#00CED1] rounded-2xl text-black text-xl font-bold" value={category} onChange={(e)=>{
  setCategory(e.target.value)
  console.log("kon");
}}>
<option className="text-red-500 text-xl font-bold" value="men's clothing">Men's clothing</option>
<option className="text-red-500 text-xl font-bold" value="jewelery">jewelery</option>
<option className="text-red-500 text-xl font-bold" value="electronics">electronics</option>
<option className="text-red-500 text-xl font-bold" value="women's clothing">Women's clothing</option>
  
</select> </div>
<div className="flex-row items-center flex-wrap border-b-4 border-gray-500">
  {products?.filter((item)=> item.category === category)
  .map((item,index)=>(
    <Product item = {item} key={index}
    />
  ))}
  
</div>

<Footer />
        </>

    )
}
export default Home;