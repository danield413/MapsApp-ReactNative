import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import MapView from 'react-native-maps';

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({ showUserLocation = true, initialLocation, ...rest }: Props) => {

    const { watchLocation, clearWatchLocation } = useLocationStore();

    useEffect(() => {

        watchLocation();

        return () => {
            clearWatchLocation();
        };

    }, []);

  return (
    <View {...rest}>
     <MapView 
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={showUserLocation}
      >
        

      </MapView>
    </View>
  )
}

export default CustomMap


const styles = StyleSheet.create({

  map: {
    width: '100%',
    height: '100%',
  }

})