import { View,Text,ScrollView,StyleSheet,TextInput, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Cardreducer";
import { useState } from "react";
const ProductInfo = ()=>{
    const route = useRoute();
    const {width} = Dimensions.get("window");
    const height = (width*100)/100;
    const dispatch = useDispatch();
    const [addedToCart,setAddedToCart] = useState(false);
    const addItemToCart = (item)=>{
        setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(()=>{
        setAddedToCart(false);
    },60000)
    }
    const cart = useSelector((state)=>{state.cart.cart});
    console.log(cart);
    return(
        <ScrollView style = {{marginTop:55,backgroundColor:"white",flex:1}} showsVerticalScrollIndicator = {false}>
<View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", height: 30, flex: 1 }}>
                        <Feather style={{ paddingLeft: 10, }} name="search" size={22} color="black" />
                        <TextInput placeholder="search here product" />
                    </TouchableOpacity>
                    <Feather name="mic" size={24} color="black" />

                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator = {false}>
                    
                    {route.params.carouselImages.map((item,index)=>(
                        
                        <ImageBackground style = {{width,height,marginTop:25,resizeMode:"contain",}} source = {{uri:item}} key = {index}>
                        <View style = {{padding:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                          <View style = {{width:40,height:40,borderRadius:20,backgroundColor:"#C60C30",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                            <Text style = {{color:"white",textAlign:"center",fontWeight:"600",fontSize:12}}>20% off</Text>
                          </View>
                          <View style = {{width:40,height:40,borderRadius:20,backgroundColor:"gray",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                          <FontAwesome name="share" size={24} color="black" />
                          </View>
                        </View>
                        <View style = {{width:40,
                        marginTop:"auto", marginLeft:20,marginBottom:20,height:40,borderRadius:20,backgroundColor:"gray",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                        <Ionicons name="heart" size={24} color="black" />
                        </View>
                        </ImageBackground>
                    ))}
                </ScrollView>
                <View style = {{padding:10}}>
                    <Text style = {{fontSize:15,fontWeight:"500"}}>{route?.params?.title}</Text>
                    <Text style = {{fontSize:18,fontWeight:"600",marginTop:6}}>₹ {route?.params?.price}</Text>
                    
                </View>
                <Text  style = {{height:1,backgroundColor:"#D0D0D0",borderWidth:1}}/>
                <View style = {{flexDirection:"row",alignItems:"center",padding:10}}>
                    <Text style = {{fontSize:15,fontWeight:"bold",}}>Color:</Text>
                    <Text>{route?.params?.color}</Text>
                </View>
                <View style = {{flexDirection:"row",alignItems:"center",padding:10}}>
                    <Text>Size:</Text>
                    <Text style = {{fontSize:15,fontWeight:"bold",}}>{route?.params?.size}</Text>
                </View>
                <Text  style = {{height:1,backgroundColor:"#D0D0D0",borderWidth:1}}/>
                <View style = {{padding:10}}>
                <Text style = {{fontSize:15,fontWeight:"bold",marginVertical:5}}>Total :₹ {route?.params?.price}</Text>
                <Text style = {{color:"#00CED1",}}>FREE Delivery Tomorrow by PM.order within 10hrs 30min</Text>
                <View style = {{flexDirection:"row",marginVertical:5,alignItems:"center",gap:5}}>
                <EvilIcons name="location" size={24} color="black" />
                <Text style = {{fontSize:15,fontWeight:"500"}}>Delivered To shahid - Raipur</Text>
                </View>
                </View>  
                <Text style = {{color:"green",marginHorizontal:10,fontWeight:"500"}}>
                    IN Stock
                </Text> 
                <TouchableOpacity onPress={()=>addItemToCart(route?.params?.item)} style = {{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:10,marginVertical:10}}>
                  {addedToCart?(
                    <View>
                        <Text>Added To Cart</Text>
                    </View>
                  ):(
                  <View>
                    <Text>Add To Cart</Text>
                  </View>
                  )} 
                </TouchableOpacity> 
                <TouchableOpacity style = {{backgroundColor:"#FFAC1C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:10,marginVertical:10}}>
                    <Text>Buy Now</Text>
                </TouchableOpacity></ScrollView>
    )
}
const styles = StyleSheet.create({});
export default ProductInfo;