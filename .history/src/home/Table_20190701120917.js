import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import { fonts, colors } from "../assets/theme";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = {
      refreshing: true,
      url:
        "http://192.168.8.100:8000/api/loadMenuByTableId/" +
        this.props.navigation.state.params.table.id
    };

    //Running the getData Service for the first time
    this.GetData();
    this.GetBillId("http://192.168.8.100:8000/api/getBillUnPaid/" +
    this.props.navigation.state.params.table.id)
  }

  _keyExtractor = (item, index) => item.title;

  componentDidMount() {
    const { state } = this.props.navigation;
    let table = state.params.table;
    this.setState({ table: table });
  }

  static navigationOptions = props1 => {
    return {
      title: "Chi tiết: " + props1.navigation.state.params.table.title,
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
  };

  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.GetData();
    Alert.alert("1");
  }


  GetData = () => {
    console.log("My URL is: " + this.state.url);
    // Service to get the data from the server to render
    return fetch(this.state.url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({
      //   username: "phuctu1901"
      // })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          refreshing: false,
          //Setting the data source for the list to render
          dataSource: responseJson
        });
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  GetBillId(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify({
      //   username: "phuctu1901"
      // })
    })
    .then(response => response.text())
    .then(responseText => {
        this.setState({
          billId: responseText
        });
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  viewTicket(item) {
    this.props.navigation.navigate("AddFood");
  }

  addMore() {
    this.props.navigation.navigate("AddFood", {billId:this.state.billId, table:this.state.table, onRefresh:this.onRefresh.bind(this)});
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemCount}>{item.count}</Text>
      </View>
    );
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
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
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
          onPress={() => this.addMore()}
        >
          <Image
            source={require("../assets/img/add.png")}
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
    height: 50 // approximate a square
  },
  // item2: {
  //   backgroundColor: "#03c9a9",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flex: 1,
  //   margin: 1,
  //   height: Dimensions.get("window").width / numColumns // approximate a square
  // },
  // item3: {
  //   backgroundColor: "#3498db",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flex: 1,
  //   margin: 1,
  //   height: Dimensions.get("window").width / numColumns // approximate a square
  // },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff"
  },
  itemCount: {
    // alignItems: "flex-end",
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
