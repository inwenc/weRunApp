//import React, { Component } from "react";
// // import { StyleSheet, Text, View, Dimensions, PanResponder } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  PanResponder,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

class CheckPointsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      markers: [],
    };
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      };
      this.setState({ region: region });
    } else {
      throw new Error("Location permission not granted");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        <MapView
          initialRegion={this.state.region}
          showCompass={true}
          rotateEnabled={false}
          showsUserLocation={true}
          style={styles.mapStyle}
          onPress={(e) => {
            this.setState({
              markers: [
                ...this.state.markers,
                { latlng: e.nativeEvent.coordinate },
              ],
            });
            console.log("e", e.nativeEvent);
          }}
        >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker key={i} coordinate={marker.latlng} />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
// const SecondScreen = () => {
//   return <Text>Hola</Text>;
// };
// class SecondScreen extends React.Component {
//   render() {
//     return <Text>Hola</Text>;
//   }
// }

// const RootStack = createNativeStackNavigator();
// const RootStackScreen = () => {
//   <RootStack.Navigator>
//     <RootStack.Screen name="App" component={HomeScreen} />
//   </RootStack.Navigator>;
// };
//   Home: { screen: HomeScreen }, });

// export default function App() {
//   return <NavigationContainer>{<RootStack />}</NavigationContainer>;
// }

// const AppNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     About: {
//       screen: AboutScreen,
//     },
//     Contact: {
//       screen: ContactScreen,
//     },
//   },
//   {
//     initialRouteName: "Home",
//     contentOptions: {
//       activeTintColor: "#e91e63",
//     },
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to WeRun</Text>
      <Button
        title="Choose your checkpoints on Map"
        onPress={() => navigation.navigate("CheckPointsMap")}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CheckPointsMap" component={CheckPointsMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
