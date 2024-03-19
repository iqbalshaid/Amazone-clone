import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigators from './Navigation/StackNavigator';
import {Provider} from "react-redux";
import Store from './Store';
import { UserContext } from './UserContext';
import { ModalPortal } from 'react-native-modals';

export default function App() {
  //console.log("hello");
  return (
    <Provider store = {Store}>
    <UserContext>
    <StackNavigators/>
    <ModalPortal/>
    </UserContext>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  }
});
 