import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CheckPointsMap } from "./components/CheckPointsMap";
import { HomeScreen } from "./components/HomeScreen";
import { AnimatedMarkers } from "./components/AnimatedMarkers";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CheckPointsMap" component={CheckPointsMap} />
        <Stack.Screen name="AnimatedMarkers" component={AnimatedMarkers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
