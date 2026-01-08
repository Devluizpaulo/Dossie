
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
  updatePassword as updateAuthPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin_master' | 'user';
  accessCode?: string; // This can be removed or repurposed
  status: 'active' | 'inactive';
}

const usersCollection = 'users';

/**
 * Creates a new regular user in Firebase Auth and Firestore.
 *
 * @param auth - The Firebase Auth instance.
 * @param firestore - The Firestore instance.
 * @param userData - The data for the new user, including password.
 */
export async function createUser(
    auth: Auth, 
    firestore: Firestore, 
    userData: Omit<User, 'id' | 'status' | 'role' | 'accessCode'> & { password: string }
): Promise<string> {
    
    const userRole = userData.email === 'luizpaulo.jesus@bmv.global' ? 'admin_master' : 'user';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const { user } = userCredential;

        await updateProfile(user, { displayName: userData.name });

        const newUserDocRef = doc(firestore, usersCollection, user.uid);
        const fullUserData: User = {
            id: user.uid,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            role: userRole,
            status: 'active',
        };

        await setDoc(newUserDocRef, fullUserData);
        return user.uid;

    } catch (error: any) {
        let errorMessage = "Não foi possível criar o usuário.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Este e-mail já está em uso por outro usuário.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
        }
        
        // Firestore permission errors are handled by the permission error emitter
        if (!error.code?.startsWith('auth/')) {
            const permissionError = new FirestorePermissionError({
              path: `/${usersCollection}/${auth.currentUser?.uid || 'new-user'}`,
              operation: 'create',
              requestResourceData: { email: userData.email, role: 'user' },
            });
            errorEmitter.emit('permission-error', permissionError);
        }

        throw new Error(errorMessage);
    }
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
    const userCredential = await createUserWithEmailAndPassword(auth, adminData.email, adminData.password);
    const { user } = userCredential;

    await updateProfile(user, { displayName: adminData.name });

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
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está em uso por outro administrador.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('A senha é muito fraca. Use pelo menos 6 caracteres.');
    }
    
    const permissionError = new FirestorePermissionError({
      path: `/${usersCollection}/${auth.currentUser?.uid || 'new-user'}`,
      operation: 'create',
      requestResourceData: { email: adminData.email, role: 'admin_master' },
    });
    errorEmitter.emit('permission-error', permissionError);

    throw new Error(error.message || "Não foi possível criar o administrador. Tente novamente.");
  }
}

/**
 * Updates an existing user document in Firestore and their password in Auth if provided.
 *
 * @param auth - The Firebase Auth instance.
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user to update.
 * @param userData - The partial data to update, may include a new password.
 */
export async function updateUser(
    auth: Auth,
    firestore: Firestore,
    userId: string,
    userData: Partial<Omit<User, 'id'>> & { password?: string }
): Promise<void> {
    const userDocRef = doc(firestore, usersCollection, userId);
    const { password, ...firestoreData } = userData;

    // Update Firestore document
    if (Object.keys(firestoreData).length > 0) {
        await updateDoc(userDocRef, firestoreData)
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: userDocRef.path,
                    operation: 'update',
                    requestResourceData: firestoreData,
                });
                errorEmitter.emit('permission-error', permissionError);
                throw serverError;
            });
    }

    // If a new password is provided, update it in Firebase Auth
    // THIS REQUIRES ADMIN PRIVILEGES, which is handled by Firebase Functions in a real app.
    // Here we simulate the intent, but it will fail without a backend function.
    if (password && auth.currentUser && auth.currentUser.uid === userId) {
        try {
            // This will likely fail without reauthentication, which is complex from an admin panel.
            // A real-world scenario would use a Firebase Function.
            await updateAuthPassword(auth.currentUser, password);
        } catch (error: any) {
            console.error("Password update in Auth failed. This usually requires reauthentication or admin privileges.", error);
            throw new Error("Não foi possível atualizar a senha no Firebase Auth. Esta operação geralmente requer privilégios de administrador ou reautenticação.");
        }
    }
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
