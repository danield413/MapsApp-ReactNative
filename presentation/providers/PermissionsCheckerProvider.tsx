import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { router } from 'expo-router';
import React, { PropsWithChildren, useEffect } from 'react';
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

    // TODO: ESTAR PENDIENTE CUANDO EL ESTADO DE LA APLICACIÓN CAMBIA

    return (
        <> {children} </>
    )
}

export default PermissionsCheckerProvider