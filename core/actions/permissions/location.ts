
import { PermissionStatus } from '@/infrastructure/interfaces/location';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        //  MANUAL PERMISSION REQUEST

        if ( status === 'denied' ) {
            manualPermissionRequest();
        }

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
    Alert.alert(
        'Permisos de ubicación',
        'Para utilizar esta funcionalidad, necesitamos acceso a su ubicación. ¿Desea abrir la configuración de la aplicación?',
        [
            {
                text: 'Cancelar',
                style: 'destructive',
            },
            {
                text: 'Abrir Configuración',
                onPress: () => {
                    Linking.openSettings();
                },
            },
        ]
    );

}