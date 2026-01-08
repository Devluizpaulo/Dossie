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

export interface AuthorizedDomain {
  id?: string;
  domain: string;
  responsible: string;
  justification: string;
  status: 'active' | 'inactive';
  createdAt: any;
}

const domainsCollection = 'authorizedDomains';

/**
 * Creates a new authorized domain document in Firestore.
 *
 * @param firestore - The Firestore instance.
 * @param domainData - The data for the new domain.
 */
export async function createDomain(firestore: Firestore, domainData: Omit<AuthorizedDomain, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const newDomainRef = doc(collection(firestore, domainsCollection));
  const fullDomainData: AuthorizedDomain = {
    ...domainData,
    id: newDomainRef.id,
    status: 'active',
    createdAt: serverTimestamp(),
  };

  await setDoc(newDomainRef, fullDomainData)
    .catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: newDomainRef.path,
        operation: 'create',
        requestResourceData: fullDomainData,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError; // Re-throw to be caught by the UI
    });

  return newDomainRef.id;
}
