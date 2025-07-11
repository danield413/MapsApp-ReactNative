import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import PermissionsCheckerProvider from '@/presentation/providers/PermissionsCheckerProvider';
import React from 'react';
import { useColorScheme } from '../presentation/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PermissionsCheckerProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade_from_bottom',
              animationDuration: 300,
            }}
          >
            <Stack.Screen
              name="loading/index" options={{ animation: 'none' }}
            />
            <Stack.Screen
              name="map/index" options={{ animation: 'fade' }}
            />
            <Stack.Screen
              name="permissions/index" options={{ animation: 'fade' }}
            />
          </Stack>
        </PermissionsCheckerProvider>
        {/* <StatusBar style="auto" /> */}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
