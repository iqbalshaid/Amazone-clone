import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../component/Navbar";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RoomIcon from '@mui/icons-material/Room';
import { useSelector } from "react-redux";
import { userType } from "../UserContext";

const Address = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState([]); // Initialize address as an empty array
   const {userId} = useContext(userType);
    useEffect(() => {
        fetchAddresses();
    }, [userId]); // Dependency array is empty, runs once on component mount

    const fetchAddresses = async () => {
        try {
           
            const res = await axios.get(`http://127.0.0.1:8000/address/${userId}`);
            console.log(res.data);
            setAddress(res.data); // Update address with fetched data
        } catch (err) {
            console.log("Error fetching addresses:", err);
            // Handle error if necessary
        }
    }

    return (
        <>
            <NavBar />
            <div className="mt-28 flex items-center justify-center bg-[#00CED1]">
                <div className="text-red-700 text-5xl">
                    <SearchIcon />
                </div>
                <input className="bg-white border-4 rounded-3xl my-2 text-2xl text-black px-36 py-3 mx-5 max-sm:px-0 max-sm:mx-0" placeholder="Enter Your Search" />
                <div className="text-red-700 text-5xl">
                    <MicNoneIcon />
                </div>
            </div>
            <div className="p-10">
                <h1 className="my-1 text-7xl text-[#00CED1] max-sm:text-4xl">Your Address</h1>
                <button className="flex w-full bg-white items-center justify-between mt-10 border-[#D0D0D0] border-2 border-l-0 border-r-0 py-8 px-5">
                    <h1 className="my-1 text-xl text-[#00CED1] max-sm:text-sm">Add a New Address</h1>
                    <div className="text-black text-5xl max-sm:text-3xl" onClick={() => navigate("/addaddress")}>
                        <KeyboardArrowRightIcon />
                    </div>
                </button>
                {/* Check if address is an array before mapping over it */}
                {address.map((item, index) => (
                    <div key={index} className="border-1 border-[#D0D0D0] p-10 flex-col items-center gap-5">
                        <div className="flex items-center gap-5">
                            <h1 className="my-1 text-xl text-amber-700">{item?.name}</h1>
                            <div className="text-black text-5xl"><Link to="addaddress"><RoomIcon /></Link></div>
                        </div>
                        <h1 className="text-5xl text-[#181818]">{item?.flat}</h1>
                        <h1 className="text-5xl text-[#181818]">{item?.area}</h1>
                        <h1 className="text-5xl text-[#181818]">India, Bangalore</h1>
                        <h1 className="text-5xl text-[#181818]">Phone No: {item?.mobile}</h1>
                        <h1 className="text-5xl text-[#181818]">Pincode No: {item?.postalcode}</h1>
                        <div className="flex items-center gap-10 mt-10">
                            <button className="bg-[#f5f5f5] px-5 py-3 rounded-xl border-1 border-[#D0D0D0]">
                                <h1 className="text-5xl text-[#181818]">Edit</h1>
                            </button>
                            <button className="bg-[#f5f5f5] px-5 py-3 rounded-xl border-1 border-[#D0D0D0]">
                                <h1 className="text-5xl text-[#181818]">Remove</h1>
                            </button>
                            <button className="bg-[#f5f5f5] px-5 py-3 rounded-xl border-1 border-[#D0D0D0]">
                                <h1 className="text-5xl text-[#181818]">Set as Default</h1>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Address;
