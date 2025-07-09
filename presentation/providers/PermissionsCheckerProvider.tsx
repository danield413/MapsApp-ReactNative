import React, { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';

import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { router } from 'expo-router';
import { usePermissionsStore } from '../store/usePermissions';

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionsStore();

    useEffect(() => {

        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/map');
        } else if ( locationStatus === PermissionStatus.CHECKING ) {
            router.replace('/permissions');
        }

    }, [locationStatus]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    // ESTAR PENDIENTE CUANDO EL ESTADO DE LA APLICACIÓN CAMBIA

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            
            if( nextAppState === 'active' ) {
                checkLocationPermission();
            }
        });

        return () => {
            subscription.remove();
        }

    }, [locationStatus]);

    return (
        <> {children} </>
    )
}

export default PermissionsCheckerProvider