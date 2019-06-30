

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
// import LoginScreen from "./auth/LoginScreen";


import { colors, fonts } from './theme'
import { Image, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

const HomeNav = createStackNavigator({
  Cities: { screen: Cities },
  City: { screen: City },
  EditCity: { screen: EditCity },
  DetailTicket: {screen: DetailTicket}
});

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
      title: 'Danh sách bàn',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/img/listTicket.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  Hisstory: {
    screen: HomeNav,
    navigationOptions: {
      title: 'Mua vé',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/img/buyticket.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  Profile: {
    screen: HomeNav,
    navigationOptions: {
      title: 'Tài khoản',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./assets/profile.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  }
}

const routeConfig = {
  tabBarPosition: 'bottom',
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
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3
    },
  }
}


const CitiesTabs = createBottomTabNavigator(routes, routeConfig);


// const CitiesTabs = createBottomTabNavigator({
//   'Danh sách vé': { screen: CitiesNav },
//   'Mua vé':{screen: BuyTicketNav},
//   'Thông tin tài khoản': { screen: AddCity }
// });
const mainNav = createSwitchNavigator(
    {
      Login: AuthTabs,
      City : CitiesTabs
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

export default Tabs;
