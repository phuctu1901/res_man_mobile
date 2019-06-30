import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
// import LoginScreen from "./auth/LoginScreen";

import { colors, fonts } from "../assets/theme";
import { Image, StyleSheet } from "react-native";
import React from "react";
import Home from "../home/Home";
import AuthTabs from "../auth/Tabs";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Table from "../home/Table";

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const HomeNav = createStackNavigator({
  Home: { screen: Home },
  Table: { screen: Table },
  AddFood: {screen: AddFood}
  
});

HomeNav.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
  
// const BuyTicketNav = createStackNavigator({
//   StationScanner: {screen: StationScanner},
//   ListRoute:{screen: ListRoute},
//   DetailRoute: {screen: DetailRoute},
//   MomoPayment:{screen: MomoPayment},
//   BuySuccess: {screen: BuySuccess},
// })

const routes = {
  Home: {
    screen: HomeNav,
    navigationOptions: {
      title: "Danh sách bàn",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/img/listTicket.png")}
          style={[styles.icon, { tintColor }]}
        />
      ),
    }
  },
  History: {
    screen: SignIn,
    navigationOptions: {
      title: "Mua vé",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/img/buyticket.png")}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  Profile: {
    screen: SignUp,
    navigationOptions: {
      title: "Tài khoản",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/img/profile.png")}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  }
};

const routeConfig = {
  tabBarPosition: "bottom",
  tabBarOptions: {
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.secondary,
    indicatorStyle: { backgroundColor: colors.secondary },
    labelStyle: {
      fontFamily: fonts.base,
      fontSize: 12
    },
    style: {
      backgroundColor: "white",
      borderTopWidth: 0,
      paddingBottom: 3
    }
  }
};

const MainTabs = createAppContainer(
  createBottomTabNavigator(routes, routeConfig)
);

// const CitiesTabs = createBottomTabNavigator({
//   'Danh sách vé': { screen: CitiesNav },
//   'Mua vé':{screen: BuyTicketNav},
//   'Thông tin tài khoản': { screen: AddCity }
// });
const mainNav = createSwitchNavigator(
  {
    Login: AuthTabs,
    Home: MainTabs
    //   City: City,
    //   EditCity: EditCity
  },
  {
    initialRouteName: "Login"
  }
);

// const CitiesTabs = createBottomTabNavigator({
//     Cities: { screen: CitiesNav },
//     AddCity: { screen: AddCity }
// });

const Tabs = createAppContainer(mainNav);

// export default Tabs;
export default MainTabs;
