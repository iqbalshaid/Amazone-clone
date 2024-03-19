import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
verified:{
    type:Boolean,
    default:false
},
verificationToken:{
    type:String,
},
address:[{
    userId:String,
    name:String,
    mobileNo:String,
    houseNo:String,
    streetNo:String,
    landMark:String,
    city:String,
    country:String,
    postCode:String,


}],
orders:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order"
}],
createdAt:{
    type:Date,
    default:Date.now,
}
})
const User = mongoose.model("User",userSchema);
export default  User;