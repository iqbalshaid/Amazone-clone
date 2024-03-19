import { Text, View, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from "react-native"
//import { KeyboardEvent } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { userType } from "../UserContext";
import { useContext } from "react";
const Login = () => {
    const {userId} = useContext(userType);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(()=>{
        const checkLoginStatus = async ()=>{
            try{
                if(!userId){
                    navigation.replace("main");
                }
                

            }catch(err){
                console.log("error message",err);
                navigation.replace("login")
            }
        }
        checkLoginStatus();
    },[])
    const handleLogin = ()=>{
        const user = {
            email:email,
            password:password
        }
       // console.log(user);
        axios.post("http://10.0.2.2:8000/login",user).then((response)=>{
            //console.log(response);
            
           //console.log("hello",userId);
            // Decode the JWT to get user information
          

            // Save the user ID in AsyncStorage or use it as needed
            
            navigation.replace("main");
        }).catch((err)=>{
            Alert.alert("Login Error","Invalid Email");
            console.log(err);
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"
                    }}
                />
            </View>

            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login In To your Account </Text>
            </View>
            <View style={{ marginTop: 70 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                    <MaterialIcons style={{ marginLeft: 8, color: "gray" }} name="email" size={24} color="black" />
                    <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                        onChangeText={(text) => {
                            setEmail(text)
                        }} placeholder="Enter Your Email" value={email} />
                </View>
            </View>
            <View style={{ marginTop: 30 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                    <FontAwesome5 name="passport" size={24} color="black" style={{ marginLeft: 8, color: "gray" }} />
                    <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        secureTextEntry={true}
                        placeholder="Enter Your Password" value={password} />
                </View>

            </View>
            <View style = {{flexDirection:"row",justifyContent:"space-between",gap:90,alignItems:"center",marginTop:10}}>
            <Text>Keep me Logged in </Text>
            <Text style = {{color:"#007FFF",fontWeight:"500",}}>Forget Password </Text>
            </View>
            <View style = {{marginTop:15}}>
                <TouchableOpacity onPress = {handleLogin} style = {{width:200,backgroundColor:"#FEBE10",borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15,marginTop:40}}>
                    <Text style = {{textAlign:"center",fontSize:18,fontWeight:"600",color:"white"}}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate("register")}>
                <Text style = {{color:"gray",fontSize:13,fontWeight:"600",textAlign:"center"}}>Don't Have a Account Then ?SignUp </Text>
            </TouchableOpacity>


        </SafeAreaView>

    )
}
const styles = StyleSheet.create({});
export default Login;