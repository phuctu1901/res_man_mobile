import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import { fonts, colors } from "../assets/theme";
const data = [
  { key: "A", status: "Trống" },
  { key: "B", status: "Có khách" },
  { key: "C", status: "Trống" },
  { key: "D", status: "Đã đặt bàn" },

  // { key: 'K' },
  // { key: 'L' },
];



export default class AddFood extends React.Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: false };
    //Running the getData Service for the first time
    this.GetData();
  }

  static navigationOptions = {
    title: "Thêm món",
    headerTitleStyle: {
      color: "white",
      fontSize: 25,
      fontWeight: "400"
    },
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: "#fff",
    tabBarVisible: false
  };

  GetData = () => {
    //Service to get the data from the server to render
    // return fetch("http://192.168.43.177:8000/api/table", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    //   // body: JSON.stringify({
    //   //   username: "phuctu1901"
    //   // })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({
    //       refreshing: false,
    //       //Setting the data source for the list to render
    //       dataSource: responseJson
    //     });
    //     console.log(responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.GetData();
  }

  viewTicket(item) {
    Alert.alert("hello");
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.status === "Trống") {
      return (
        // <TouchableWithoutFeedback onPress={() => this.viewTicket(item)}>
        //   <View style={styles.item}>
        //     <Text style={styles.itemText}>{item.key}</Text>
        //     <Text style={styles.itemCount}>{item.status}</Text>
        //   </View>
        // </TouchableWithoutFeedback>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
        <View style={{flex:1}}>
          <Text style={styles.itemText}>
            Mon an
          </Text>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.itemText}>
            R$ 12
          </Text>
        </View>

        <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
          >
            <Image
              source={require('../assets/img/buyticket.png')}
              style={styles.btnImage}/>
          </TouchableOpacity>
          <Text
            style={styles.itemText}>
            123
          </Text>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
           >
            <Image
              source={require('../assets/img/listTicket.png')}
              style={styles.btnImage}/>
          </TouchableOpacity>
        </View>
      </View>
      );
    }

    if (item.status === "Có khách") {
      return (
        <View style={styles.item2}>
          <Text style={styles.itemText}>{item.key}</Text>
          <Text style={styles.itemText}>{item.status}</Text>
        </View>
      );
    }

    if (item.status === "Đã đặt bàn") {
      return (
        <View style={styles.item3}>
          <Text style={styles.itemText}>{item.key}</Text>
          <Text style={styles.itemText}>{item.status}</Text>
        </View>
      );
    }
  };
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: "90%",
          backgroundColor: "#808080"
        }}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          //   disabled={this.state.disabled}
          //   onPress={this.addMore}
        >
          <Image
            source={require("../assets/img/buyticket.png")}
            style={styles.btnImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 1
  },
  item: {
    backgroundColor: "#ff9478",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 50// approximate a square
  },
  item2: {
    backgroundColor: "#03c9a9",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 50// approximate a square
  },
  item3: {
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 50 // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "red"
  },
  itemCount: {
    alignItems:"flex-end",
    color: "#fff"
  },
  btn: {
    position: "absolute",
    right: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 15
  },

  btnImage: {
    resizeMode: "contain",
    width: "100%",
    tintColor: "green"
  }
});
