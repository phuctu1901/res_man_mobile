import React from "react";

import MainTabs from "./src/nav/nav";
import AuthTabs from "./src/auth/Tabs";
import AsyncStorage from "@react-native-community/async-storage";
export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    accessCode: "",
    // isLogged: false
    isLogged: false
  };

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData != null) {
        console.log(data);
        let data = String.parse(userData);
        this.setState({ accessCode: data });
        this.setState({ isLogged: true });
        // this.GetDetail();
      }
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  componentDidMount() {
    this.getToken();
  }

  render() {
    if (this.state.isLogged) return <MainTabs />;
    else {
      return <AuthTabs />;
    }
  }
}
