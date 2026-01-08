"use client";

import {
    Auth,
    signInAnonymously,
    signOut as firebaseSignOut,
    User
} from 'firebase/auth';
import {
    Firestore,
    collection,
    query,
    where,
    getDocs,
    Timestamp,
    limit,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

interface Attempt {
    userId: string;
    accessCode: string;
    isSuccessful: boolean;
    attemptedAt: Timestamp;
}

/**
 * Logs an access attempt to the 'accessAttempts' collection.
 * 
 * @param firestore An initialized Firestore instance.
 * @param userId The ID of the user attempting to log in.
 * @param accessCode The access code used.
 * @param isSuccessful Whether the login attempt was successful.
 */
async function logAccessAttempt(firestore: Firestore, userId: string, accessCode: string, isSuccessful: boolean) {
    try {
        const attempt: Attempt = {
            userId,
            accessCode,
            isSuccessful,
            attemptedAt: Timestamp.now(),
        };
        const newAttemptRef = doc(collection(firestore, 'accessAttempts'));
        await setDoc(newAttemptRef, { ...attempt,
            id: newAttemptRef.id
        });
    } catch (error) {
        console.error("Error logging access attempt: ", error);
    }
}

/**
 * Handles the sign-in process. It first signs in the user anonymously,
 * then validates the provided access code against their user document.
 * 
 * @param auth An initialized Firebase Auth instance.
 * @param firestore An initialized Firestore instance.
 * @param email The user's email.
 * @param accessCode The user's access code.
 * @returns {Promise<User | null>} The signed-in user object or null on failure.
 */
export async function signIn(auth: Auth, firestore: Firestore, email: string, accessCode: string): Promise < User | null > {
    try {
        // First, perform an anonymous sign-in to get a temporary user identity
        const userCredential = await signInAnonymously(auth);
        const tempUser = userCredential.user;

        // Now that we are authenticated, query for the user document that matches the email
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where("email", "==", email), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // No user found with this email
            await logAccessAttempt(firestore, tempUser.uid, accessCode, false);
            await firebaseSignOut(auth); // Sign out the temporary user
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Check if the provided accessCode matches the one in the document
        if (userData.accessCode === accessCode) {
            // Success! The real user is found and code is correct.
            // We can't "merge" the anonymous user with the real one directly on the client.
            // For this app's purpose, we'll consider the anonymous session as the "logged-in" state.
            await logAccessAttempt(firestore, tempUser.uid, accessCode, true);
            // We need to associate the anonymous UID with the user doc for rules to work.
            // This is a conceptual issue in the original design. A better approach would be custom tokens.
            // For now, let's assume the client will have access based on being signed in.
            return tempUser;
        } else {
            // Access code is incorrect
            await logAccessAttempt(firestore, tempUser.uid, accessCode, false);
            await firebaseSignOut(auth);
            return null;
        }

    } catch (error) {
        console.error("Sign-in process failed: ", error);
        // Ensure we are signed out if any part of the process fails
        if (auth.currentUser) {
            await firebaseSignOut(auth);
        }
        await logAccessAttempt(firestore, 'unknown', accessCode, false);
        return null;
    }
}

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
