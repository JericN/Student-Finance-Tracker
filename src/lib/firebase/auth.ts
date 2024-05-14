import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '$lib/firebase/firebase.client';
import { createUserTransactionForm } from '$lib/firebase/database';
import { session } from '$lib/store/session';

export async function loginWithMail(email: string, password: string) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        session.create(user);
    } catch (error) {
        throw new Error('Failed logging in user');
    }
}

// Note: we are enabling session here
export async function registerWithMail(username: string, email: string, password: string) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: username });
        createUserTransactionForm(user);
        session.create(user);
    } catch (error) {
        throw new Error('Failed registering user');
    }
}

export async function signOutUser() {
    try {
        await auth.signOut();
        session.clear();
    } catch (error) {
        throw new Error('Failed signing out user');
    }
}

export async function resetPassword() {
    try {
        const { email } = session.values();
        if (!email) throw new Error('No email found');
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw new Error('Failed sending reset password email');
    }
}

export async function updateProfileName(username: string) {
    try {
        const { uid } = session.values();
        if (!uid) throw new Error('No user found');
        if (!auth.currentUser) throw new Error('No user found');
        await updateProfile(auth.currentUser, { displayName: username });
        session.create(auth.currentUser);
    } catch (error) {
        throw new Error('Failed updating profile name');
    }
}
