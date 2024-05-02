import {
    type Category,
    type CategoryForm,
    type Template,
    type TemplateForm,
    Transaction,
    type TransactionForm,
    TransactionType,
    type Wallet,
    type WalletForm,
    type Wishlist,
    type WishlistForm,
    type BudgetPref,
    type BudgetPrefForm,
} from '$lib/models/sft';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
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

// This function is used to fetch all transactions
export async function getTransactions() {
    const path = `UserData/${session.uid()}/transactions`;

    try {
        const snap = await getDocs(collection(db, path));
        const transactions = [] as Transaction[];

        snap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Transaction, value);
            if (json.success) transactions.push(json.output);
            else throw new Error('Failed parsing transaction');
        });
        return transactions;
    } catch (e) {
        throw new Error('Failed fetching transactions');
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

// This function is used to fetch all wallets
export async function getWallets() {
    const path = `UserData/${session.uid()}/wallets`;

    try {
        const snap = await getDocs(collection(db, path));
        const wallets = [] as Wallet[];

        snap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            // TODO: parse the value to the Wallet type
            wallets.push(value as Wallet);
        });

        return wallets;
    } catch (e) {
        throw new Error('Failed fetching wallets');
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

// This function is used to fetch all categories
export async function getCategories() {
    const path = `UserData/${session.uid()}/categories`;

    try {
        const snap = await getDocs(collection(db, path));
        const categories = [] as Category[];

        snap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            // TODO: parse the value to the Category type
            categories.push(value as Category);
        });

        return categories;
    } catch (e) {
        throw new Error('Failed fetching categories');
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

// This function is used to create a new wishlist item
export async function addWishlist(wishlist: WishlistForm) {
    const path = `UserData/${session.uid()}/wishlist`;
    const payload = { ...wishlist, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    try {
        await addDoc(collection(db, path), payload);
    } catch (e) {
        throw new Error('Failed adding wishlist');
    }
}

// This function is used to remove a wishlist item
export async function removeWishlist(id: string) {
    const path = `UserData/${session.uid()}/wishlist/${id}`;

    try {
        await deleteDoc(doc(db, path));
    } catch (e) {
        throw new Error('Failed removing wishlist');
    }
}

// This function is used to update the wishlist item
export async function updateWishlist(wishlist: Wishlist) {
    const path = `UserData/${session.uid()}/wishlist/${wishlist.id}`;
    const payload = { ...wishlist, updatedAt: serverTimestamp() };

    try {
        await setDoc(doc(db, path), payload);
    } catch (e) {
        throw new Error('Failed updating wishlist');
    }
}

// This function is used to fetch all wishlist items
export async function getWishlist() {
    const path = `UserData/${session.uid()}/wishlist`;

    try {
        const snap = await getDocs(collection(db, path));
        const wishlist = [] as Wishlist[];

        snap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            // TODO: parse the value to the Wishlist type
            wishlist.push(value as Wishlist);
        });

        return wishlist;
    } catch (e) {
        throw new Error('Failed fetching wishlist');
    }
}

// This function is used to clear a budget preference
export async function removeBudgetPref(id: string) {
    const path = `UserData/${session.uid()}/budgetpref/${id}`;

    try {
        await deleteDoc(doc(db, path));
    } catch (e) {
        throw new Error('Failed removing budget preference');
    }
}

// This function is used to update a budget preference
export async function updateBudgetPref(budgetpref: BudgetPref) {
    const path = `UserData/${session.uid()}/budgetpref/${budgetpref.id}`;
    const payload = { ...budgetpref, updatedAt: serverTimestamp() };

    try {
        await setDoc(doc(db, path), payload);
    } catch (e) {
        throw new Error('Failed updating budget preference');
    }
}