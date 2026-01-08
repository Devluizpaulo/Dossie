"use client";

import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin_master' | 'user';
  accessCode?: string;
  status: 'active' | 'inactive';
}

const usersCollection = 'users';

/**
 * Creates a new regular user document in Firestore.
 *
 * @param firestore - The Firestore instance.
 * @param userData - The data for the new user, without an ID.
 */
export async function createUser(firestore: Firestore, userData: Omit<User, 'id' | 'status'>): Promise<string> {
  const newUserRef = doc(collection(firestore, usersCollection));
  const fullUserData: User = {
    ...userData,
    id: newUserRef.id,
    status: 'active',
  };

  await setDoc(newUserRef, fullUserData)
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: newUserRef.path,
        operation: 'create',
        requestResourceData: fullUserData,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError;
    });

  return newUserRef.id;
}

/**
 * Creates a new admin user in Firebase Auth and a corresponding document in Firestore.
 *
 * @param auth - The Firebase Auth instance.
 * @param firestore - The Firestore instance.
 * @param adminData - The admin's name, email, and password.
 */
export async function createAdminUser(
  auth: Auth,
  firestore: Firestore,
  adminData: Pick<User, 'name' | 'email'> & { password: string }
) {
  try {
    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, adminData.email, adminData.password);
    const { user } = userCredential;

    // 2. Update the user's profile in Auth
    await updateProfile(user, { displayName: adminData.name });

    // 3. Create the user document in Firestore with 'admin_master' role
    const userDocRef = doc(firestore, usersCollection, user.uid);
    const adminUserData: User = {
      id: user.uid,
      name: adminData.name,
      email: adminData.email,
      role: 'admin_master',
      status: 'active',
    };

    await setDoc(userDocRef, adminUserData);

    return userCredential;
  } catch (error: any) {
    // Check for specific auth errors
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está em uso por outro administrador.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('A senha é muito fraca. Use pelo menos 6 caracteres.');
    }
    
    // Firestore permission errors or other errors
    const permissionError = new FirestorePermissionError({
      path: `/${usersCollection}/${auth.currentUser?.uid || 'new-user'}`,
      operation: 'create',
      requestResourceData: { email: adminData.email, role: 'admin_master' },
    });
    errorEmitter.emit('permission-error', permissionError);

    // Re-throw a generic error to be caught by the UI
    throw new Error(error.message || "Não foi possível criar o administrador. Tente novamente.");
  }
}


/**
 * Updates an existing user document in Firestore.
 *
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user to update.
 * @param userData - The partial data to update.
 */
export async function updateUser(firestore: Firestore, userId: string, userData: Partial<Omit<User, 'id'>>): Promise<void> {
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

/**
 * Deletes a user document from Firestore.
 * Note: This does not delete the user from Firebase Authentication.
 *
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user to delete.
 */
export async function deleteUser(firestore: Firestore, userId: string): Promise<void> {
  const userDocRef = doc(firestore, usersCollection, userId);

  return deleteDoc(userDocRef)
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: userDocRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError;
    });
}