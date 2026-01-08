"use client";

import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin_master' | 'user';
  accessCode?: string;
}

const usersCollection = 'users';

/**
 * Creates a new user document in Firestore.
 * This is a non-blocking operation that creates a document with a new auto-generated ID.
 *
 * @param firestore - The Firestore instance.
 * @param userData - The data for the new user, without an ID.
 */
export async function createUser(firestore: Firestore, userData: Omit<User, 'id'>): Promise<string> {
  const newUserRef = doc(collection(firestore, usersCollection));
  const fullUserData: User = {
    ...userData,
    id: newUserRef.id,
  };

  await setDoc(newUserRef, fullUserData)
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: newUserRef.path,
        operation: 'create',
        requestResourceData: fullUserData,
      });
      errorEmitter.emit('permission-error', permissionError);
      // Re-throw the original error to let the caller handle UI feedback (e.g., toast).
      throw serverError;
    });

  return newUserRef.id;
}


/**
 * Updates an existing user document in Firestore.
 * This is a non-blocking operation.
 *
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user to update.
 * @param userData - The partial data to update.
 */
export async function updateUser(firestore: Firestore, userId: string, userData: Partial<User>): Promise<void> {
    const userDocRef = doc(firestore, usersCollection, userId);

    return updateDoc(userDocRef, userData)
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'update',
                requestResourceData: userData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw serverError;
        });
}
