import { View,Text ,ScrollView,TextInput,StyleSheet,Image, TouchableOpacity} from "react-native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { incrementQuantity,decrementQuantity,removeFromCart } from "../redux/Cardreducer";
const Cart = ()=>{
    const cart = useSelector((state)=>state.cart.cart);
    const total = cart?.map((item)=>item.price*item.quantity).reduce((curr,prev)=>curr+prev,0);
    const dispatch = useDispatch();
    const increaseQuantity = (item) => {
      dispatch(incrementQuantity(item));
    };
    const decreaseQuantity = (item) => {
      dispatch(decrementQuantity(item));
    };
    const deleteItem = (item) => {
      dispatch(removeFromCart(item));
    };
    const navigation = useNavigation();
      return (
        <ScrollView style = {{marginTop:55,flex:1,backgroundColor:"white"}}>
         <View style={{ backgroundColor: "#00CED1", padding: 10, flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", height: 30, flex: 1 }}>
                        <Feather style={{ paddingLeft: 10, }} name="search" size={22} color="black" />
                        <TextInput placeholder="search here product" />
                    </TouchableOpacity>
                    <Feather name="mic" size={24} color="black" />

                </View>
                <View style = {{padding:10,flexDirection:"column",alignItems:"center"}}>
                    <Text style = {{fontSize:10,fontWeight:"400"}}>SubTotal</Text>
                    <Text style = {{fontSize:20,fontWeight:"bold"}}>{total}</Text>
                    <Text>EMI Details Available</Text>
                    <TouchableOpacity  onPress = {()=>navigation.navigate("confirm")} 
                    style = {{backgroundColor:"#FFC72C", 
                    padding:10,borderRadius:5,justifyContent:"center",
                    alignItems:"center",marginHorizontal:10,marginTop
                    :10}}>
                        <Text>
                            Proceed To Buy ({cart.length}) items</Text>
                    </TouchableOpacity>
                    <Text style = {{height:1,borderColor:"#D0D0D0",borderWidth:1,marginTop:16}} />
                    <View style = {{marginHorizontal:10}}>
                        {cart?.map((item,index)=>(
                            <View style = {{backgroundColor:"white",marginVertical:10,borderBottomColor:"#f0f0f0",borderWidth:2,borderLeftWidth:0,borderRightWidth:0,borderTop:0}} key = {index}>
                            <TouchableOpacity style = {{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                                <Image style = {{width:140,height:140,resizeMode:"contain"}}
                                source = {{uri:item?.image}}/>
                                <View>
                                    <Text numberOfLines={3} style = {{width:150,marginTop:10}}>{item?.title}</Text>
                                    <Text style = {{fontSize:20,fontWeight:"bold",marginTop:6}}>{item?.price}</Text>
                                      <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
                                </View>
                            </TouchableOpacity>
               <TouchableOpacity   style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,}}>
                 <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                            {item?.quantity > 1 ? (
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Save For Later</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>See More Like this</Text>
              </TouchableOpacity>
            
                            </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
               

        </ScrollView>
      )
}
const styles = StyleSheet.create({});
export default Cart;