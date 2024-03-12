import { type UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$lib/firebase.client';
import { session } from '$lib/store/session';

export function loginWithMail(email: string, password: string) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const { user }: UserCredential = result;
                session.setUser(user);
                resolve(user);
            })
            .catch(_ => {
                session.removeUser();
                reject();
            });
    });
}

export function registerWithMail(email: string, password: string) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const { user }: UserCredential = result;
                session.setUser(user);
                resolve(user);
            })
            .catch(_ => {
                session.removeUser();
                reject();
            });
    });
}

export function signOutUser() {
    return new Promise((resolve, reject) => {
        auth.signOut()
            .then(() => {
                session.removeUser();
                resolve(true);
            })
            .catch(() => {
                reject();
            });
    });
}
