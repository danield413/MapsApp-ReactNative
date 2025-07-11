import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import MapView from 'react-native-maps';

interface Props extends ViewProps {
    showUserLocation?: boolean;
    initialLocation: LatLng;
}

const CustomMap = ({ showUserLocation = true, initialLocation, ...rest }: Props) => {

    const mapRef = useRef<MapView>(null);

    const { watchLocation, clearWatchLocation, lastKnownLocation } = useLocationStore();

    useEffect(() => {

        watchLocation();

        return () => {
            clearWatchLocation();
        };

    }, []);

    useEffect(() => {
        if (lastKnownLocation) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation]);

    const moveCameraToLocation = (latlng: LatLng) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: {
                latitude: latlng.latitude,
                longitude: latlng.longitude,
            },
            zoom: 15,
        });
    }

    return (
        <View {...rest}>
            <MapView
                ref={mapRef}
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