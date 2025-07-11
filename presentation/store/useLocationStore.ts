import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";


interface LocationState {
    lastKnownLocation: LatLng | null;
    userLocationList: LatLng[];
    watchSubscription: LocationSubscription | null;

    getLocation: () => Promise<LatLng>;
    watchLocation: () => void;

    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSubscription: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
    },

    watchLocation: async () => {
        const oldSubscription = get().watchSubscription;

        if (oldSubscription !== null) {
            get().clearWatchLocation();
        }

        const watchSubscription = await watchCurrentPosition((latLng) => {
            set((state) => ({
                lastKnownLocation: latLng,
                userLocationList: [...state.userLocationList, latLng],
            }));
        });

        set({ watchSubscription });
    },

    clearWatchLocation: () => {
        const watchSubscription = get().watchSubscription;

        if (watchSubscription) {
            watchSubscription.remove();
        }
    },
}))