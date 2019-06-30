import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import MainTabs from "./src/nav/nav";
import AuthTabs from "./src/auth/Tabs"
import AsyncStorage from "@react-native-community/async-storage";
export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    accessCode: "",
    visible: false,
    isLogged: false
  };
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: true };
    //Running the getData Service for the first time
    this.GetData();
  }
  

 

  
  render() {
    return (
      <AuthTabs/>
    );
  }
}


