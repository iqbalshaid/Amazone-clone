import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CallIcon from '@mui/icons-material/Call';

const Footer = ()=>{
    const Product = [
        {
            id:1,
            name:"Jeans",
        },
        {
            id:2,
            name:"T-shirt"
        },
        {
            id:3,
            name:"Baby"
        },
        {
            id:4,
            name:"Sharee",
        },
        {
            id:5,
            name:"lekis",
        },
        
    ];
    const Electronics = [
        {
            id:1,
            name:"Mobile",
        },
        {
            id:2,
            name:"Laptop"
        },
        {
            id:3,
            name:"Earphone"
        },
        {
            id:4,
            name:"Smart Watch"   
        },
        {
            id:5,
            name:"Tap"
        }
    ];
    const sport = [
        {
            id:1,
            name:"Bat",
        },
        {
            id:2,
            name:"Ball"
        },
        {
            id:3,
            name:"Badminton",
        },
        {
            id:4,
            name:"Basket Ball",
        },
        {
            id:5,
            name:"Scart Shoe"
        }
    ];
    const food = [
        {
            id:1,
            name:"Rice"
        },
        {
            id:2,
            name:"Oil"
        },
        {
            id:3,
            name:"Ghee"
        },
        {
            id:4,
            name:"Wheat"
        },
        {
            id:5,
            name:"Masala"
        }
    ];
    return (
        <> 
        <div className="bg-black">
        <div className="flex items-center justify-around max-sm:block">
        <div className="my-4">
        <div className="border-b-4 border-gray-500 max-sm:mt-2"><h1 className="text-center text-xl text-[#00CED1]">Popular Products</h1></div>
            <div className="flex items-center justify-center">
                <div>{Product.map((item,index)=>(
                    <h2  className = " mt-1 flex flex-row items-center justify-center text-base text-white"key={index}>{item.name}</h2>
                ))}</div>
            </div> 
            </div>
            <div>            <div className="border-b-4 border-gray-500 max-sm:mt-2"><h1 className="text-center text-xl text-[#00CED1]">Sport</h1></div>
            <div className="flex items-center justify-center">
                <div>{sport.map((item,index)=>(
                    <h2  className = " mt-1 flex flex-row items-center justify-center text-base text-white"key={index}>{item.name}</h2>
                ))}</div>
            </div> 
            </div>
            <div>
        <div className="border-b-4 border-gray-500 max-sm:mt-2"><h1 className="text-center text-xl text-[#00CED1]">Electronics</h1></div>
            <div className="flex items-center justify-center">
                <div>{Electronics.map((item,index)=>(
                    <h2  className = " mt-1 flex flex-row items-center justify-center text-base text-white"key={index}>{item.name}</h2>
                ))}</div>
            </div> 
            </div>
            <div>
        <div className="border-b-4 border-gray-500 max-sm:mt-2"><h1 className="text-center text-xl text-[#00CED1]">Food Products</h1></div>
            <div className="flex items-center justify-center">
                <div>{food.map((item,index)=>(
                    <h2  className = " mt-1 flex flex-row items-center justify-center text-base text-white"key={index}>{item.name}</h2>
                ))}</div>
            </div> 
            </div>
</div>
            
           <ul className="flex items-center justify-center gap-8 "><li className="text-[#00CED1] text-3xl mb-4"><FacebookIcon/></li>
           <li className="text-[#00CED1] text-3xl mb-4"><InstagramIcon /></li>
           <li className="text-[#00CED1] text-3xl mb-4"><TwitterIcon/></li>
           <li className="text-[#00CED1] text-3xl mb-4"><CallIcon /></li></ul>
           </div>
        </>
    )
}
export default Footer;