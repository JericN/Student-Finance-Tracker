import { type Record, type Template, type TemplateForms, Transaction } from '$lib/models/types';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
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

// This function is used to create a new transaction
export async function addTransaction(data: Record) {
    const path = `UserData/${session.uid()}/transactions`;
    const payload = { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };

    try {
        await addDoc(collection(db, path), payload);
    } catch (e) {
        throw new Error('Failed adding transaction');
    }
}

// This function is used to remove a transaction
export async function removeTransaction(id: string) {
    const path = `UserData/${session.uid()}/transactions/${id}`;

    try {
        await deleteDoc(doc(db, path));
    } catch (e) {
        throw new Error('Failed removing transaction');
    }
}

// This function is used to update an existing transaction
export async function updateTransaction(transaction: Transaction) {
    const path = `UserData/${session.uid()}/transactions/${transaction.id}`;
    const payload = { ...transaction, updatedAt: serverTimestamp() };

    try {
        await setDoc(doc(db, path), payload);
    } catch (e) {
        throw new Error('Failed updating transaction');
    }
}

// This function is used to retrieve all transactions
export async function getTransactions(): Promise<Transaction[]> {
    const docRef = collection(db, `UserData/${session.uid()}/transactions`);
    const transactions: Transaction[] = [];

    try {
        const docSnap = await getDocs(docRef);
        docSnap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Transaction, value);
            if (json.success) transactions.push(json.output);
            else throw new Error('Failed parsing transaction');
        });
        return transactions;
    } catch (e) {
        throw new Error('Failed retrieving transactions');
    }
}

// This function is used to create a new template
export async function addTemplate(data: TemplateForms) {
    const path = `UserData/${session.uid()}/transaction-templates`;
    const payload = { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };

    try {
        await addDoc(collection(db, path), payload);
    } catch (e) {
        throw new Error('Failed adding template');
    }
}

// This function is used to remove a template
export async function removeTemplate(id: string) {
    const path = `UserData/${session.uid()}/transaction-templates/${id}`;

    try {
        await deleteDoc(doc(db, path));
    } catch (e) {
        throw new Error('Failed removing template');
    }
}

// This function is used to update an existing template
export async function updateTemplate(template: Template) {
    const path = `UserData/${session.uid()}/transaction-templates/${template.id}`;
    const payload = { ...template, updatedAt: serverTimestamp() };

    try {
        await setDoc(doc(db, path), payload);
    } catch (e) {
        throw new Error('Failed updating template');
    }
}
