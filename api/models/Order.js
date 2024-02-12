import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        products:[
            {
            name:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:true,
            }
        }],
        totalPreice:{
            type:Number,
            required:true,
        },
        shippingAddress:{
            name:{
                type:String,
                required:true,
                
        },
        mobileNo:{
            type:String,
            required:true,
        },
        houseNo:{
            type:String,
            required:true,
        },
        street:{
            type:String,
            required:true,
        },
        landMark:{
            type:String,
            required:true,
        },
        postCode:{
            type:String,
            required:true
        }

        },
        paymentMethod:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    
})
const orders = mongoose.model("order",OrderSchema);
export default orders;