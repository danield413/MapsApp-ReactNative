
import { PermissionStatus } from '@/infrastructure/interfaces/location';
import * as Location from 'expo-location';

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        // TODO: MANUAL PERMISSION REQUEST
        return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
}


export const checkLocationPermission = async (): Promise<PermissionStatus> => {

    const { status } = await Location.getForegroundPermissionsAsync();

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }

}

const manualPermissionRequest = async () => {
    // Lanzar los ajustes de la aplicación para que el usuario pueda conceder permisos manualmente


}