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
    limit
} from 'firebase/firestore';
import {
    setDoc
} from 'firebase/firestore';
import {
    doc
} from 'firebase/firestore';

interface Attempt {
    userId: string;
    accessCode: string;
    isSuccessful: boolean;
    attemptedAt: Timestamp;
}

/**
 * Validates the provided access code against the 'users' collection in Firestore.
 * 
 * @param firestore An initialized Firestore instance.
 * @param email The user's email.
 * @param accessCode The access code to validate.
 * @returns {Promise<User | null>} The user object if validation is successful, otherwise null.
 */
async function validateAccessCode(firestore: Firestore, email: string, accessCode: string): Promise < User | null > {
    try {
        const usersRef = collection(firestore, 'users');
        const q = query(
            usersRef,
            where('email', '==', email),
            where('accessCode', '==', accessCode),
            limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            // Here, we're assuming the document ID is the user's UID for anonymous auth
            return userDoc.data() as User;
        }
    } catch (error) {
        console.error("Error validating access code: ", error);
    }
    return null;
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
 * Handles the sign-in process.
 * 
 * @param auth An initialized Firebase Auth instance.
 * @param firestore An initialized Firestore instance.
 * @param email The user's email.
 * @param accessCode The user's access code.
 * @returns {Promise<User | null>} The signed-in user object or null on failure.
 */
export async function signIn(auth: Auth, firestore: Firestore, email: string, accessCode: string): Promise < User | null > {
    const validatedUser = await validateAccessCode(firestore, email, accessCode);

    if (validatedUser) {
        try {
            const userCredential = await signInAnonymously(auth);
            await logAccessAttempt(firestore, userCredential.user.uid, accessCode, true);
            return userCredential.user;
        } catch (error) {
            console.error("Anonymous sign-in failed: ", error);
            await logAccessAttempt(firestore, 'unknown', accessCode, false);
            return null;
        }
    } else {
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