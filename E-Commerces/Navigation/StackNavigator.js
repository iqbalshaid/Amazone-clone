import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Login from "../pages/Login";
import Address from "../pages/Address";
import Register from "../pages/Register";
import ProductInfo from "../pages/ProductInfo";
import Home from "../pages/Home";
import AddAddress from "../pages/AddAddress";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Confirm from "../pages/Confirm";
import Order from "../pages/Order";
const StackNavigators = ()=>{
    const stack = createStackNavigator();
    const Tabs = createBottomTabNavigator();
    function BottomTabs(){
        return (
            <Tabs.Navigator>
                <Tabs.Screen name="home" component={Home}
                    options={{tabBarLabel:"home",
                    tabBarLabelStyle:{color:"#00BE97"},
                    headerShown:false,
                    tabBarIcon:({focused}) =>
                        focused?(
                            <FontAwesome name="home" size={24} color="#00BE97" />
                        ):(
                            <AntDesign name="home" size={24} color="black" />
                        )
                    }}
                />
                <Tabs.Screen name="profile" component={Profile}
                    options={{tabBarLabel:"profile",
                    tabBarLabelStyle:{color:"#00BE97"},
                    headerShown:false,
                    tabBarIcon:({focused}) =>
                        focused?(
                            <Ionicons name="person" size={24} color="#00BE97" />
                        ):(
                            <Ionicons name="person-add-outline" size={24} color="black" />
                        )
                    }}
                />
                <Tabs.Screen name="cart" component={Cart}
                    options={{tabBarLabel:"cart",
                    tabBarLabelStyle:{color:"#00BE97"},
                    headerShown:false,
                    tabBarIcon:({focused}) =>
                        focused?(
                            <Entypo name="shopping-cart" size={24} color="#00BE97" />
                        ):(
                            <Feather name="shopping-cart" size={24} color="black" />
                        )
                    }}
                />
            </Tabs.Navigator>
        )
    }
    return(
        
            <stack.Navigator>
                <stack.Screen name="login" options={{
                    headerShown:false
                }} component={Login}/>
                <stack.Screen name = "register" component = {Register}
                options = {{headerShown:false}}/>
                <stack.Screen name="main" component={BottomTabs} options={{ headerShown: false }} /> 
                <stack.Screen name="info" component={ProductInfo}
                    options={{headerShown:false}}
                />
                <stack.Screen name = "address" component={Address}
                options={{headerShown:false}}/>
                <stack.Screen name="addaddress" component={AddAddress}
                options={{headerShown:false}}/>
                <stack.Screen name="confirm" component={Confirm}
                options={{headerShown:false}}/>
                <stack.Screen name="order" component={Order}
                options={{headerShown:false}}/>
            </stack.Navigator>
        

    )
}
export default  ()=>{    return(
        <NavigationContainer independent = {true}>
            <StackNavigators/>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create();