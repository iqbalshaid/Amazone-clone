import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React, { useLayoutEffect, useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { Ionicons, AntDesign } from "@expo/vector-icons";
  import axios from "axios";
  import { userType } from "../UserContext";
  import { useContext } from "react";
  

  const Profile = () => {
    const {userId} = useContext(userType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    {/*useLayoutEffect ka use hota hai koy vhi page ke header ko design karne ke liye */}
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#00CED1",
        },
        headerLeft: () => (
          <Image
            style={{ width: 140, height: 120, resizeMode: "contain" }}
            source={{
              uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
            }}
          />
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginRight: 12,
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
  
            <AntDesign name="search1" size={24} color="black" />
          </View>
        ),
      });
    }, []);
    const [user, setUser] = useState();
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `http://10.0.2.2:8000/profile/${userId}`
          );
          const { user } = response.data;
          setUser(user);
        } catch (error) {
          console.log("error", error.message);
        }
      };
  
      fetchUserProfile();
    }, []);
    const logout = () => {
      clearAuthToken();
    };
    const clearAuthToken = async () => {
      await axios.post("http://10.0.2.2:8000/logout");
      console.log("logout ");
      navigation.replace("login");
    };
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://10.0.2.2:8000/orders/${userId}`
          );
          const orders = response.data.orders;
          setOrders(orders);
  
          setLoading(false);
        } catch (error) {
          console.log("error", error.message);
        }
      };
  
      fetchOrders();
    }, []);
    console.log("orders", orders);
    return (
      <ScrollView style={{ padding: 10,marginTop:55, flex: 1, backgroundColor: "white" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Welcome {user?.name}
        </Text>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <TouchableOpacity
          onPress={()=>navigation.navigate("order")}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Your orders</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Your Account</Text>
          </TouchableOpacity>
        </View>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Buy Again</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={logout}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Logout</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text>Loading...</Text>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={order._id}
              >
                {/* Render the order information here */}
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={{ marginVertical: 10 }} key={product._id}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                ))}
              </TouchableOpacity>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>
      </ScrollView>
    );
  };
  
  export default Profile;
  
  const styles = StyleSheet.create({});