import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import User from "./models/User.js"
import Order from "./models/Order.js";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs"
dotenv.config();
const PORT = process.env.PORT||8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cookieParser());
const conn = async ()=>{
    try{
        console.log("how");
         mongoose.connect("mongodb+srv://shahidiqbal63209:Shahid786@cluster0.lbxy9hu.mongodb.net/",{
             useNewUrlParser:true,
              useUnifiedTopology:true,
        })
        console.log("database was connected")
    }catch(err){
        console.log("database was disconnected");

    }
}
mongoose.set('debug', true);

app.listen(PORT,()=>{
    conn();
    console.log("server is running");
})
console.log("how1");
//function to sendVerificationEmail
const sendVerificationEmail = async (email,verificationToken)=>{
    //create a nodemailer transport
    const transporter = nodemailer.createTransport({
        //configure the service
        service:"gmail",
        auth:{
            user:"shahidiqbal63209@gmail.com",
            pass:"eusy uxah goqa egaw"
        }
    })
    //compose the email message
    const mailOptions = {
        from:"shahidiqbal63209@gmail.com",
        to:email,
        subject:"Email Verification",
        text:`Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`
    }
    //send the email
    try{
     await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log("error come on sending verification email",err);
    }
}
console.log("me")
app.post("/register", async (req,res)=>{
    //console.log("how are you");
    try{
       // console.log("shahid");
       const {name,email,password} = req.body;
       //check the email are registered or not
      // console.log(name);
       //console.log("hello");
       const findemail = await User.findOne({email});
       if(findemail){
        return res.status(400).json("email is already registered")
       }
       // create a new user
       const newuser = new User({name,email,password});
       //generate and store the verification token
       newuser.verificationToken = crypto.randomBytes(20).toString("hex");
       //save the user in the database
       await newuser.save();
       sendVerificationEmail(newuser.email,newuser.verificationToken);
    }
    catch(err){
        console.log("something error on register",err);
        res.status(500).json("not registered");

    }
})
//console.log("kon")
//endpoint to verify the email
app.get("/verify/:Token",async (req,res)=>{
    try{
     const Token = req.params.Token;
     //find the user with given verification email
     const users = await User.findOne({verificationToken:Token})
     if(!users){
        res.status(404).json("message invalid token");
     }
     //mark the user as verified
     users.verified = true;
     users.verificationToken = undefined;
     await users.save();
     res.status(200).json("email verified successfully");
    }
    catch(err){
        res.status(500).json("verification is fail");
    }
})
// const generateSecretKey = ()=>{
//     const secretKey = crypto.randomBytes(32).toString("hex");
//     return secretKey;
// }
// const secretKey = generateSecretKey();
//endpoint login the user
app.post("/login",async (req,res)=>{
    try{
      console.log("kon");
        const {email,password} = req.body;
        //console.log(password);
        const uses = await User.findOne({email});
        console.log(uses.password)
        if(!uses){
          console.log("hello")
           return  res.status(401).json({message:"Invalid password and Email"});
        }
        
        // if(uses.password!=password){
        //     return res.status(401).json({message:"Invalid password"});
        // }
        const passok = bcrypt.compareSync(password,uses.password);
        console.log("me shahid")
        //generate the token
       // console.log("me shahid")
       const expiresInDays = 7;
       if(!passok){
        const token = jwt.sign({userId:uses._id},process.env.JWT,{expiresIn:expiresInDays * 24 * 60 * 60});
       console.log(uses._id)
       res.cookie('token', token, { httpOnly: true , secure: true, // Set for HTTPS
       sameSite: 'strickt' });
      
        res.status(200).json("login successfully");
        console.log(uses._id);
       }
    }
    catch(err){
        res.status(500).json("login is failed");
    }
})
app.get('/profiles', (req, res) => {
  const token = req.cookies.token;
 // console.log(req.cookies.token);
  console.log("hrello",token)
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
console.log("me hoo kon")
  try {
   //console.log(process.env.JWT);
   const expiresInDays = 7;
    const decoded = jwt.verify(token, process.env.JWT,{expiresIn:expiresInDays * 24 * 60 * 60});
    //console.log("hello",decoded);
    const userId = decoded.userId;
    
    res.send(`User ID: ${userId}`);
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});
app.post('/logout', (req, res) => {
  
  res.clearCookie('token');
  res.send('Logout successful');
  console.log("hello")
});

//enpoint of address
//console.log("shahid");
app.post("/address", async (req, res) => {
  try {
  
    console.log("Received request body:", req.body);
     const { userId: rawUserId, address } = req.body;
    const userId = rawUserId.replace(/User ID: (.*)/, '$1');

    //console.log(userId);
    // find the user by the Userid
    
    const users = await User.findById(userId);
console.log(users);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    // add the new address to the user's addresses array
    users.address.push(address);
   console.log("hello");
    // save the updated user in the backend
    await users.save();

    res.status(200).json({ message: "Address created Successfully" ,users});
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});
  
  //endpoint to get all the addresses of a particular user
  app.get("/address/:userId", async (req, res) => {
    try {
      console.log("hello");
      const rawUserId = req.params.userId;
    const userId = rawUserId.replace(/User ID: (.*)/, '$1');
    
     console.log(userId);
      const user = await User.findById(userId);
      console.log("how");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const addresses = user.address;
      res.status(200).json({ addresses });
    } catch (error) {
      res.status(500).json({ message: "Error retrieveing the addresses" });
    }
  });
  
  //endpoint to store all the orders
  app.post("/orders", async (req, res) => {
    console.log("hello");
    try {
      const { userId: rawUserId, cartItems, totalPrice, shippingAddress, paymentMethod } =
        req.body;
        
    const userId = rawUserId.replace(/User ID: (.*)/, '$1');

       console.log(userId)
    
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      //create an array of product objects from the cart Items
      const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image,
      }));
  
      //create a new Order
      const order = new Order({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
      });
  
      await order.save();
  
      res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
      console.log("error creating orders", error);
      res.status(500).json({ message: "Error creating orders" });
    }
  });
  
  //get the user profile
  app.get("/profile/:userId", async (req, res) => {
    try {
      const rawUserId = req.params.userId;
    const userId = rawUserId.replace(/User ID: (.*)/, '$1');
    
      console.log(userId);
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving the user profile" });
    }
  });
  
  app.get("/orders/:userId",async(req,res) => {
    try{
      const rawUserId = req.params.userId;
      const userId = rawUserId.replace(/User ID: (.*)/, '$1');
      
  
      const order = await Order.find({user:userId}).populate("user");
  
      if(!order || order.length === 0){
        return res.status(404).json({message:"No orders found for this user"})
      }
  
      res.status(200).json({ order });
    } catch(error){
      res.status(500).json({ message: "Error"});
    }
  })