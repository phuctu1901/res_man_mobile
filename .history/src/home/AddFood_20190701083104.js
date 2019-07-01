import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import { fonts, colors } from "../assets/theme";
import NumberFormat from "react-number-format";


export default class AddFood extends React.Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: true,  selected: [] , foodSelected:[] };
    //Running the getData Service for the first time
    this.GetData();
  }
  _keyExtractor = (item, index) => item.id;

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
    // Service to get the data from the server to render
    return fetch("http://restaurantmanagement.ftumedia.tech/api/food", {
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
        for (var i = 1; i<=responseJson.length; i++){
          this.state.foodSelected[i]=0;
        }
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
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

  remove =(id)=> {
    if (this.state.foodSelected[id]==0) {
      Alert.alert("Sản phẩm này chưa được chọn");
    }
    else{
      console.log("Remove: "+id);
      this.state.foodSelected[id]=this.state.foodSelected[id]-1;
      // this.state.selected.push({id:id, count: 1});
    }
    
    console.log(this.state.foodSelected);
  }


  add=(id)=>{
    
    this.state.foodSelected[id]=this.state.foodSelected[id]+1;
    console.log(this.state.foodSelected);

    console.log("Add: "+id);

  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      // <TouchableWithoutFeedback onPress={() => this.viewTicket(item)}>

      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemCount}>12</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn1}
          //   disabled={this.state.disabled}
          onPress={()=>this.remove(item.id)}
        >
          <Image
            source={require("../assets/img/remove.png")}
            style={styles.btnImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn2}
          //   disabled={this.state.disabled}
          onPress={()=>this.add(item.id)}
        >
          <Image
            source={require("../assets/img/add.png")}
            style={styles.btnImage}
          />
        </TouchableOpacity>
      </View>

      // </TouchableWithoutFeedback>
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
        <View style={styles.container2}>
          <View style={styles.btn}>
            <Text>Apply</Text>
          </View>
        </View>
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
    marginVertical: 10,
    margin: 1,
    height: 80 // approximate a square
  },
  item2: {
    backgroundColor: "#03c9a9",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: 80 // approximate a square
  },
  item3: {
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    height: 80 // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff"
  },
  itemPrice: {
    alignItems: "flex-end",
    color: "#fff"
  },
  itemCount: {
    alignItems: "flex-end",
    color: "#fff"
  },
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  btn1: {
    borderRadius: 30,
    flex: 1,
    position: "absolute",
    width: 40,
    left: 5,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center"
  },
  btn2: {
    borderRadius: 30,
    height: "80%",
    flex: 1,
    position: "absolute",
    width: 40,
    right: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  btnImage: {
    resizeMode: "contain",
    width: "100%",
    tintColor: "white"
  }
});
