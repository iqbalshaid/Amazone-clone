import { View,Text,StyleSheet, TouchableOpacity,Image} from "react-native";
import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/Cardreducer";
const Product = ({item})=>{
    const dispatch = useDispatch();
    const [addedToCart,setAddedToCart] = useState(false);
    const addItemToCart = (item)=>{
        setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(()=>{
        setAddedToCart(false);
    },60000)
    }

    
    return (
        <TouchableOpacity style = {{marginHorizontal:20,marginVertical:25}}>
            <Image style = {{width:150,height:150,resizeMode:"contain"}}
                source={{uri:item?.image}}
            />
            <Text numberOfLines={1} style = {{width:150,marginTop:10}}>{item?.title}</Text>
            <View style = {{marginTop:5,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Text style = {{fontSize:15,fontWeight:"bold"}}>
                ₹{item?.price}
                </Text>
                <Text style = {{color:"#FFC72C",fontWeight:"bold"}}>{item?.rating?.rate}ratings </Text>
            </View>
            <TouchableOpacity onPress={()=>addItemToCart(item)} style = {{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginHorizontal:10,marginTop:10}}>
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
        </TouchableOpacity>
    )


    
}
const styles = StyleSheet.create({});
export default Product;