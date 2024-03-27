import {
    type Category,
    type CategoryForm,
    type Template,
    type TemplateForm,
    type Transaction,
    type TransactionForm,
    TransactionType,
    type Wallet,
    type WalletForm,
} from '$lib/models/types';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '$lib/firebase/firebase.client';
import { session } from '$lib/store/session';

// This function is used to create a new transaction
export async function addTransaction(data: TransactionForm) {
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

// This function is used to create a new template
export async function addTemplate(template: TemplateForm) {
    const path = `UserData/${session.uid()}/transaction-templates`;
    const payload = { ...template, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };

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

// This function is used to create a new wallet
export async function addWallet(wallet: WalletForm) {
    const path = `UserData/${session.uid()}/wallets`;
    const payload = { ...wallet, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    try {
        await addDoc(collection(db, path), payload);
    } catch (e) {
        throw new Error('Failed adding wallet');
    }
}

// This function is used to remove a wallet
export async function removeWallet(id: string) {
    const path = `UserData/${session.uid()}/wallets/${id}`;

    try {
        await deleteDoc(doc(db, path));
    } catch (e) {
        throw new Error('Failed removing wallet');
    }
}

// This function is used to update an existing wallet
export async function updateWallet(wallet: Wallet) {
    const path = `UserData/${session.uid()}/wallets/${wallet.id}`;
    const payload = { ...wallet, updatedAt: serverTimestamp() };

    try {
        await setDoc(doc(db, path), payload);
    } catch (e) {
        throw new Error('Failed updating wallet');
    }
}

// This function is used to create a new category
export async function addCategory(category: CategoryForm) {
    const path = `UserData/${session.uid()}/categories`;
    const payload = { ...category, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };

    try {
        await addDoc(collection(db, path), payload);
    } catch (e) {
        throw new Error('Failed adding category');
    }
}

// This function is used to remove a category
export async function removeCategory(id: string) {
    const path = `UserData/${session.uid()}/categories/${id}`;

    try {
        await deleteDoc(doc(db, path));
    } catch (e) {
        throw new Error('Failed removing category');
    }
}

// This function is used to update an existing category
export async function updateCategory(category: Category) {
    const path = `UserData/${session.uid()}/categories/${category.id}`;
    const payload = { ...category, updatedAt: serverTimestamp() };

    try {
        await setDoc(doc(db, path), payload);
    } catch (e) {
        throw new Error('Failed updating category');
    }
}

// This function is used to create a user record when a new user registers
export async function createUserTransactionForm(user: User) {
    const { uid, email, displayName } = user;

    await setDoc(doc(db, `UserData/${uid}`), {
        uid: uid,
        email: email,
        username: displayName,
    });

    await addWallet({ amount: 0, name: 'Cash' });
    await addWallet({ amount: 0, name: 'Bank' });

    await addCategory({ name: 'Food', type: TransactionType.Expense, icon: '🍔' });
    await addCategory({ name: 'Fare', type: TransactionType.Expense, icon: '🚌' });
    await addCategory({ name: 'Utils', type: TransactionType.Expense, icon: '🏠' });
    await addCategory({ name: 'Salary', type: TransactionType.Income, icon: '💰' });
}
