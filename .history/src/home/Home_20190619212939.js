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

import {fonts, colors} from "../assets/theme"
const data = [
  { key: "A", status: "Trống" },
  { key: "B", status: "Có khách" },
  { key: "C", status: "Trống" },
  { key: "D", status: "Đã đặt bàn" },
  { key: "E", status: "Đã đặt bàn" },
  { key: "F", status: "Đã đặt bàn" }
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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: true };
    //Running the getData Service for the first time
    this.GetData();
  }

  static navigationOptions = {
    title: "Danh sách vé",
    headerTitleStyle: {
      color: "white",
      fontSize: 25,
      fontWeight: "400"
    },
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: "#fff"
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

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.status === "Trống") {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.key}</Text>
          <Text style={styles.itemText}>{item.status}</Text>
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

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
  },
  item: {
    backgroundColor: "#ff9478",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns // approximate a square
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
  }
});
