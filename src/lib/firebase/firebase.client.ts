import { type Auth, getAuth } from 'firebase/auth';
import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Firestore, getFirestore } from 'firebase/firestore';
import { browser } from '$app/environment';

export let app: FirebaseApp;
export let auth: Auth;
export let db: Firestore;

const firebaseConfig = {
    apiKey: 'AIzaSyA1UTETFeAQLLWCmnYZ7DxGp-owebWIiPE',
    authDomain: 'student-finance-tracker.firebaseapp.com',
    projectId: 'student-finance-tracker',
    storageBucket: 'student-finance-tracker.appspot.com',
    messagingSenderId: '954593556380',
    appId: '1:954593556380:web:f95c7479759b4b37247a59',
};

export function initializeFirebase() {
    if (!browser) return;

    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    }
}
