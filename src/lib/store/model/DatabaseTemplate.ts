import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initStore<T>(path: string, schema: any) {
    const store = writable<T[]>([]);
    const { set, subscribe, update } = store;

    const q = query(collection(db, `UserData/${session.uid()}/${path}`));

    const unsubscribe = onSnapshot(q, snap => {
        const categories: T[] = [];
        if (snap.metadata.hasPendingWrites) return;

        snap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(schema, value);
            if (json.success) categories.push(json.output);
            else throw new Error('Failed parsing data from database');
        });

        set(categories);
    });

    return {
        set,
        subscribe,
        update,
        unsubscribe,
    };
}

export type Store<T> = ReturnType<typeof initStore<T>>;
