
import {  useEffect, useState } from "react";
import { View,Text,ScrollView,StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { userType } from "../UserContext";
import { useContext } from "react";


const AddAddress = ()=>{
    const navigation = useNavigation();
    const {userId} = useContext(userType);
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [flat,setFlat] = useState('');
    const [area,setArea] = useState('');
    const [landmark,setLandMark] = useState('');
    const [postalcode,setPostalCode] = useState('');
   
          const handleAddress = ()=>{
         console.log(userId);

         const addressData = {
        userId:userId, // Extract userId from the userType context
            address: {
              name: name,
              mobile: mobile,
              flat: flat,
              landmark: landmark,
              postalcode: postalcode,
              area: area,
            },
          };//console.log(address);
     console.log(name)
     console.log(userId);
     console.log("hello how are you")
     try{
     axios.post("http://10.0.2.2:8000/address",addressData);
     Alert.alert("success","Address added successfully");
     setName("");
     setMobile("");
     setArea("");
     setFlat("");
     setLandMark("");
     setPostalCode("");
     setTimeout(()=>{
      navigation.goBack();
     },500)}
     catch(err){
          console.log("what ever the error is");
          Alert.alert("Error","Fail to add Address")
     }
    }
    return(
      <ScrollView style = {{marginTop:15}}>
        <View style = {{height:50,backgroundColor:"#00CED1"}}></View>
        <View style = {{padding:10}}>
            <Text style = {{fontSize:17,fontWeight:"bold"}}>Add a new Address</Text>
            <TextInput placeholderTextColor="black" placeholder="india" style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            <View style = {{marginVertical:10}}>
                <Text style = {{fontSize:15,fontWeight:"bold",}}>Full Name (First and Last Name)</Text>
                <TextInput  placeholderTextColor = "black" placeholder="Enter Your Name" onChangeText={(text)=>setName(text)} value={name} style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            </View>
            <View>
                <Text style = {{fontSize:15,fontWeight:"bold",}}>Mobile No.</Text>
                <TextInput  placeholderTextColor = "black" placeholder="Enter Your Mobile No." onChangeText={(text)=>setMobile(text)} value = {mobile} style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            </View>
            <View style = {{marginVertical:10}}>
                <Text style = {{fontSize:15,fontWeight:"bold",}}>Flat,House No.,Building,Company</Text>
                <TextInput  placeholderTextColor = "black" placeholder=""  onChangeText={(text)=>setFlat(text)} value = {flat} style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            </View>
            <View>
                <Text style = {{fontSize:15,fontWeight:"bold",}}>Area,Street,Sector,Village</Text>
                <TextInput  placeholderTextColor = "black" placeholder="" onChangeText={(text)=>setArea(text)} value={area} style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            </View>
            <View style = {{marginVertical:10}}>
                <Text style = {{fontSize:15,fontWeight:"bold",}}>LandMark</Text>
                <TextInput  placeholderTextColor = "black" placeholder="Eg Near apollo hospital" onChangeText={(text)=>setLandMark(text)} value={landmark} style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            </View>
            <View>
                <Text style = {{fontSize:15,fontWeight:"bold",}}>PinCode</Text>
                <TextInput  placeholderTextColor = "black" placeholder="Enter Your PinCode" onChangeText={(text)=>setPostalCode(text)} value = {postalcode} style = {{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5}}/>
            </View>
       <TouchableOpacity onPress={handleAddress} style = {{backgroundColor:"#FFC72C",padding:10,borderRadius:6,justifyContent:"center",alignItems:"center",marginTop:20}}>
        <Text style = {{fontWeight:"bold"}}>Add Address</Text>
       </TouchableOpacity>
       
       
       
        </View>
      </ScrollView>
    )
}
const styles = StyleSheet.create({});
export default AddAddress;