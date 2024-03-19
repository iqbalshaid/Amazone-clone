import React from 'react';
 import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProductInfo from './pages/ProductInfo';
import Order from './pages/Order';
import Confirm from './pages/Confirm';
import AddAddress from './pages/AddAddress';
import Address from './pages/Address';

import { useContext } from 'react';
import { userType } from './UserContext';
export default function App() {
  const {userId} = useContext(userType);
  
  return (
   
    
    <BrowserRouter>
    
    
      <Routes>
      
      
     {userId!==null ? <Route path='/' element = {<Home />}/>
     : <Route path='/' element = {<Login />}/> }
     
      <Route path="/register" element = {<Register />}/>
      <Route path='/home' element = {<Home />}/>
     <Route path='/confirm' element = {<Confirm/>}/>
     <Route path='/order' element = {<Order/>}/>
     <Route path='/address' element = {<Address/>}/>
     <Route path='/addaddress' element = {<AddAddress/>}/>
     <Route path='/cart' element = {<Cart/>}/>
     <Route path='/profile' element = {<Profile/>}/>
     <Route path='/productinfo' element = {<ProductInfo/>}/>
     
     </Routes>
     

   
 
    
</BrowserRouter> 

 
    
     );
}


