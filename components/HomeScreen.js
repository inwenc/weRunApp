import { StyleSheet, View, Text, Button } from "react-native";
import * as React from "react";
export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to WeRun</Text>
      <Button
        title="Choose your checkpoints on Map"
        onPress={() => navigation.navigate("CheckPointsMap")}
      />
    </View>
  );
};
