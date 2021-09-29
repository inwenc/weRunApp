import * as React from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  PanResponder,
} from "react-native";

export const CheckPointsMap = () => {
  const [region, setRegion] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  React.useEffect(() => {
    const ac = new AbortController();
    _getLocationAsync();
    return () => ac.abort();
  });

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
      setRegion(region);
    } else {
      throw new Error("Location permission not granted");
    }
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <MapView
        initialRegion={region}
        showCompass={true}
        rotateEnabled={false}
        showsUserLocation={true}
        style={styles.mapStyle}
        onPress={(e) => {
          setMarkers([...markers, { latlng: e.nativeEvent.coordinate }]);
          console.log("e", e.nativeEvent);
        }}
      >
        {markers.map((marker, i) => (
          <MapView.Marker key={i} coordinate={marker.latlng} />
        ))}
      </MapView>
    </View>
  );
};

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
