import { View,Text,ScrollView,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { Ionicons } from '@expo/vector-icons';
import { userType } from "../UserContext";
import { useContext } from "react";
import axios from "axios";



const Address = ()=>{
    const navigation = useNavigation();
    const [address,setAddress] = useState([]);
   const {userId} = useContext(userType);
    
    const fetchAddresses = async ()=>{
        
        console.log(userId);
     
        await axios.get(`http://10.0.2.2:8000/address/${userId}`)
        .then((res)=>{
            const {address} = res.data;
       
            setAddress(address)
        }).catch((err)=>{
        console.log("error to get the data from backend");
     })
    }
    useEffect(()=>{
        fetchAddresses();
     },[userId])
    
    return (
        <ScrollView showsVerticalScrollIndicator = {false} style = {{marginTop:50}}>
        <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", height: 30, flex: 1 }}>
                        <Feather style={{ paddingLeft: 10, }} name="search" size={22} color="black" />
                        <TextInput placeholder="search here product" />
                    </TouchableOpacity>
                    <Feather name="mic" size={24} color="black" />

                </View>
                <View style = {{padding:10,}}>
                    <Text style = {{fontSize:20,fontWeight:"bold"}}>Your Addresses</Text>
                    <TouchableOpacity onPress = {()=>navigation.navigate("addaddress")} 
                    style = {{flexDirection:"row",alignItems:"center",
                    justifyContent:"space-between",marginTop:10,
                    borderColor:"#D0D0D0",borderWidth:1,borderLeftWidth:0,
                    borderRightWidth:0,paddingVertical:7,paddingHorizontal:5}}>
                        <Text>Add a New Address</Text>
                        <MaterialIcons name="arrow-right" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {address.map((item,index)=>(
                            <TouchableOpacity  key = {index}
                             style = {{borderWidth:1,borderColor:"#D0D0D0",padding:10,
                             flexDirection:"column",gap:5,marginVertical:10}}>
                            <View style = {{flexDirection:"row",alignItems:"center",gap:3}}>
                            
                                <Text style = {{fontSize:15,fontWeight:"bold"}}>{item?.name}</Text>
                                <Ionicons name="ios-location-outline" size={24} color="red" />
                            </View>
                            <Text style = {{fontSize:15,color:"#181818"}}>{item?.flat} , {item?.landmark}</Text>
                            <Text style = {{fontSize:15,color:"#181818"}}>{item?.area}</Text>
                            <Text style = {{fontSize:15,color:"#181818"}}>India ,Banglore</Text>
                            <Text style = {{fontSize:15,color:"#181818"}}>Phone no:{item?.mobile}</Text>
                            <Text style = {{fontSize:15,color:"#181818"}}>PinCode No:{item?.postalcode}</Text>
                            <View style = {{flexDirection:"row",alignItems:"center",gap:10,marginTop:7}}>
                                <TouchableOpacity style = {{backgroundColor:"#f5f5f5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0"}}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {{backgroundColor:"#f5f5f5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0"}}>
                                    <Text>Remove</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {{backgroundColor:"#f5f5f5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0"}}>
                                    <Text>Set as Default</Text>
                                </TouchableOpacity>

                            </View>
                            </TouchableOpacity>
                        ))}
                    </TouchableOpacity>
                </View>
                
        </ScrollView>
    )
}
const styles = StyleSheet.create({});
export default Address;