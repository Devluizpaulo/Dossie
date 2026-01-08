
"use client";

import {
    Auth,
    signOut as firebaseSignOut
} from 'firebase/auth';

/**
 * Handles the sign-out process.
 * 
 * @param auth An initialized Firebase Auth instance.
 * @returns {Promise<void>}
 */
export async function signOut(auth: Auth): Promise < void > {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Sign out failed: ", error);
    }
}
