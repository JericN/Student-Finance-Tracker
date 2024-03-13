import { type Record, Transaction } from '$lib/models/types';
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';

// This function is used to create a user record when a new user registers
export async function createUserRecord(user: User) {
    const { uid, email, displayName } = user;
    await setDoc(doc(db, `UserData/${uid}`), {
        uid: uid,
        email: email,
        username: displayName,
    });
}

export async function addTransaction(data: Record) {
    const path = `UserData/${session.uid()}/transactions`;
    const payload = { ...data, timestamp: serverTimestamp() };

    try {
        await addDoc(collection(db, path), payload);
    } catch (e) {
        throw new Error('Failed adding transaction');
    }
}

export async function getTransactions() {
    const docRef = collection(db, `UserData/${session.uid()}/transactions`);
    const transactions: Transaction[] = [];
    try {
        const docSnap = await getDocs(docRef);
        docSnap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Transaction, value);
            if (json.success) transactions.push(json.output);
            else throw new Error('Invalid document found');
        });
        return transactions;
    } catch (e) {
        throw new Error('Failed retrieving transactions');
    }
}
