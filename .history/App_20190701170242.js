import React from "react";

import MainTabs from "./src/nav/nav";
import AuthTabs from "./src/auth/Tabs";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    accessCode: "",
    isLoading: true,
    isLogged: false
  };

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");

      if (userData != null) {
        let data = JSON.parse(userData);
        console.log(data.token);
        this.setState({ accessCode: data.token });
        this.setState({ isLogged: true });
        this.GetDetail();
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  componentDidMount() {
    this.getToken();
  }

  render() {
    if (isLoading) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return <MainTabs />;
    if (this.state.isLogged) return <MainTabs />;
    else {
      return <AuthTabs />;
    }
  }
}
