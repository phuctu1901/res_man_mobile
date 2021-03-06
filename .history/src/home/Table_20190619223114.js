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
  { key: "E", status: "Đã đặt bàn" },
  { key: "F", status: "Đã đặt bàn" },
  { key: "1", status: "Trống" },
  { key: "2", status: "Có khách" },
  { key: "3", status: "Trống" },
  { key: "4", status: "Đã đặt bàn" },
  { key: "5", status: "Đã đặt bàn" },
  { key: "6", status: "Đã đặt bàn" },
  { key: "7", status: "Trống" },
  { key: "8", status: "Có khách" },
  { key: "9", status: "Trống" },
  { key: "10", status: "Đã đặt bàn" },
  { key: "11", status: "Đã đặt bàn" }
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: false };
    //Running the getData Service for the first time
    this.GetData();
  }

  static navigationOptions = {
    title: "Danh sách món ăn",
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
        <TouchableWithoutFeedback onPress={() => this.viewTicket(item)}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.key}</Text>
            <Text style={styles.itemText}>{item.status}</Text>
          </View>
        </TouchableWithoutFeedback>
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
    alignItems: "center",
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
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  item3: {
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
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
    tintColor: "white"
  }
});
