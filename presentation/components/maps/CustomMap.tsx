import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import FAB from '../shared/FAB';

interface Props extends ViewProps {
    showUserLocation?: boolean;
    initialLocation: LatLng;
}

const CustomMap = ({ showUserLocation = true, initialLocation, ...rest }: Props) => {

    const mapRef = useRef<MapView>(null);
    const [isFollowing, setIsFollowing] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);

    const { watchLocation, clearWatchLocation, lastKnownLocation, getLocation, userLocationList } = useLocationStore();

    useEffect(() => {

        watchLocation();

        return () => {
            clearWatchLocation();
        };

    }, []);

    useEffect(() => {
        if (lastKnownLocation && isFollowing) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowing]);

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

    const moveCameraToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveCameraToLocation(initialLocation);
        } else {
            moveCameraToLocation(lastKnownLocation);
        }

        const location = await getLocation();

        if (!location) return;

        moveCameraToLocation(location);

    };

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
                onTouchStart={() => setIsFollowing(false)}
            >
                {
                    isShowingPolyline && (
                        <Polyline coordinates={userLocationList} strokeColor="#ff0055" strokeWidth={6} />
                    )
                }

            </MapView>

            <FAB iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'} onPress={() => {
                setIsShowingPolyline(!isShowingPolyline);
            }} style={{
                bottom: 140,
                right: 20,
            }} />
            <FAB iconName={isFollowing ? 'walk-outline' : 'accessibility-outline'} onPress={() => {
                setIsFollowing(!isFollowing);
            }} style={{
                bottom: 80,
                right: 20,
            }} />
            <FAB iconName="compass-outline" onPress={() => {
                moveCameraToCurrentLocation();
            }} style={{
                bottom: 20,
                right: 20,
            }} />
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