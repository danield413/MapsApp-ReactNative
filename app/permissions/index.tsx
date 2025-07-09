import ThemedPressable from '@/presentation/components/shared/ThemedPressable'
import { ThemedText } from '@/presentation/components/shared/ThemedText'
import { usePermissionsStore } from '@/presentation/store/usePermissions'
import React from 'react'
import { Text, View } from 'react-native'

const PermisionsScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionsStore();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ThemedText ><Text>Estado Actual: { locationStatus }</Text></ThemedText>
      <ThemedPressable onPress={requestLocationPermission}>
          Habilitar Ubicación
      </ThemedPressable>
    </View> 
  )
}

export default PermisionsScreen