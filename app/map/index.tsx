import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          //MANIZALES
          latitude: 5.0689,
          longitude: -75.5176,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
     
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }

})