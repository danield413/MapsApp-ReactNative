import CustomMap from '@/presentation/components/maps/CustomMap'
import { useLocationStore } from '@/presentation/store/useLocationStore'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'


const MapScreen = () => {

  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (!lastKnownLocation) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* <MapView 
        style={styles.map}
        initialRegion={{
          //MANIZALES
          latitude: 5.0689,
          longitude: -75.5176,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 5.0689, longitude: -75.5176 }}
          title="Manizales"
          description="A beautiful city in Colombia"
        />
        <Marker
          coordinate={{ latitude: 5.060232565108442, longitude: -75.48982340888398 }}
          title="Estadio Palogrande"
          description="A beautiful stadium in Manizales"
        />

      </MapView> */}

      <CustomMap
        initialLocation={ lastKnownLocation }
        showUserLocation={true}
      />

    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

})