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

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData.token != null) {
        console.log(data);
        let data = JSON.parse(userData.token);
        this.setState({ accessCode: data.token });
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
