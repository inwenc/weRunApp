//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder } from 'react-native';
import  MapView  from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      region: null,
      markerSpot: null
    }
    this._getLocationAsync();
  }
_getLocationAsync = async () =>  {
  const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }
    this.setState({region: region})
    console.log('region', location)
  } else {
    throw new Error('Location permission not granted');
  }
}

  render () {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <MapView
      initialRegion={this.state.region}
      showCompass={true}
      rotateEnabled={false}
      showsUserLocation={true}
      style={styles.mapStyle}
      >
        <MapView.Marker
          coordinate={this.state.markerSpot}
          title={"first"}
          description={"none"}
        />
        </MapView>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
