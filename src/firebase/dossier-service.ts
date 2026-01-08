
"use client";

import {
  Firestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface Dossier {
  id?: string;
  title: string;
  recipientEmail: string;
  generatedBy: string; // Admin's email
  includedAnnexes: string[];
  createdAt: any;
}

const dossiersCollection = 'dossiers';

/**
 * Creates a new dossier emission record in Firestore.
 *
 * @param firestore - The Firestore instance.
 * @param dossierData - The data for the new dossier record.
 */
export async function createDossier(firestore: Firestore, dossierData: Omit<Dossier, 'id' | 'createdAt'>): Promise<string> {
  const newDossierRef = doc(collection(firestore, dossiersCollection));
  const fullDossierData: Dossier = {
    ...dossierData,
    id: newDossierRef.id,
    createdAt: serverTimestamp(),
  };

  await setDoc(newDossierRef, fullDossierData)
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: newDossierRef.path,
        operation: 'create',
        requestResourceData: fullDossierData,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError; // Re-throw to be caught by the UI
    });

  return newDossierRef.id;
}
