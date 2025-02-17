import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '../cache';
import { Slot } from 'expo-router';

export default function RootLayoutNav() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

    if (!publishableKey) {
        throw new Error(
            'Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file',
        );
    }

    return <Slot />;
}
