import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { Wallet } from '$lib/models/types';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const WALLETS = Symbol('wallets');

// TODO: validate correctness
function initStore() {
    const store = writable<Wallet[]>([]);
    const { set, subscribe, update } = store;

    const q = query(collection(db, `UserData/${session.uid()}/wallets`));

    const unsubscribe = onSnapshot(q, querySnap => {
        const wallets: Wallet[] = [];
        if (querySnap.metadata.hasPendingWrites) return;
        querySnap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Wallet, value);
            if (json.success) wallets.push(json.output);
            else throw new Error('Failed parsing wallet');
        });
        set(wallets);
    });

    return {
        set,
        subscribe,
        update,
        unsubscribe,
    };
}

type Store = ReturnType<typeof initStore>;

export function init() {
    setContext(WALLETS, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(WALLETS)) throw new Error('Failed to initialize editing store');
    return getContext<Store>(WALLETS);
}
