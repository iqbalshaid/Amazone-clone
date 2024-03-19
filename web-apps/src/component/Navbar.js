import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
const NavBar = ()=>{
    const [open,setOpen] = useState();
    const[currentPage,setCurrentPage] = useState('');
    useEffect(() => {
        // Function to update the current page when the component mounts
        updateCurrentPage();
    },[])
    const toggle = ()=>{
        setOpen(!open);
    }
    const updateCurrentPage = () => {
        const path = window.location.pathname; // Get the current path
       setCurrentPage(path);
        console.log(path);
      };
    return (
        <>
        <div className="flex h-24 items-center justify-between mt-0 bg-[#00CED1] fixed left-0 top-0 w-[100%]">
        <img   className ="ml-8 h-20 w-16" src = "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" alt=""/>
        {open &&  <div className="w-[100%] mt-60 z-50 rounded-md float-right bg-[#00CED1]">  <ul className="block  text-center">
        <li className={`text-lg pt-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/home' ? 'text-red-600'  :'text-white'}`} value="home"><Link to="/home">Home</Link></li>
            <li className={`text-lg pt-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/profile' ? 'text-red-600'  :'text-white'}`} value="profile" ><Link to="/profile" >Profile</Link></li>
            <li className={`text-lg pt-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/downloadapp' ? 'text-red-600'  :'text-white'}`} value="downloadapp"><Link to = "/downloadapp">DownLoadApp</Link></li>
            <li className={`text-lg pt-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/cart' ? 'text-red-600'  :'text-white'}`} value="cart"><Link to="/cart">Cart</Link></li>
         </ul>
        </div>
         }
        <div className="max-sm:hidden">   <ul className="flex items-center justify-between">
            <li className={`text-lg p-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/home' ?'text-red-600' :'text-white'}`} value="home"><Link to="/home">Home</Link></li>
            <li className={`text-lg p-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/profile' ? 'text-red-600' :'text-white'}`} value="profile" ><Link to="/profile" >Profile</Link></li>
            <li className={`text-lg p-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/downloadapp' ? 'text-red-600'  :'text-white'}`} value="downloadapp"><Link to = "/downloadapp">DownLoadApp</Link></li>
            <li className={`text-lg p-3  hover:text-yellow-300 cursor-pointer ${currentPage === '/cart' ?'text-red-600'  :'text-white'}`} value="cart"><Link to="/cart">Cart</Link></li>
        </ul>
         </div>
         <div className="hidden max-sm:block mr-5">
           <button className="bg-[#00CED1] " onClick={toggle}>
            <div className="text-xl text-black font-semibold">{open ?<CloseIcon />:<MenuIcon/>}</div>
           </button>
         </div>
        </div>

        </>
    )
}
export default NavBar;