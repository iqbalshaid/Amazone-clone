import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./redux/Cardreducer"
export default configureStore({
    reducer:{
        cart:cardReducer
        //yaha pe jo hum cart ka use kiye hai oh initial sate se aaya hai jab hum 
        //redux ka create karte hai or iska use useselector me hum cart name se hi karenge
    }
})