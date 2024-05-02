import { collection, onSnapshot, query } from 'firebase/firestore';
import { get, writable } from 'svelte/store';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';

interface ID {
    id: string;
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function initStore<T extends ID>(path: string, schema: any) {
    const store = writable<T[]>([]);
    const { set, subscribe, update } = store;

    const q = query(collection(db, `UserData/${session.uid()}/${path}`));

    const unsubscribe = onSnapshot(q, snap => {
        const data: T[] = [];
        if (snap.metadata.hasPendingWrites) return;

        snap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(schema, value);
            if (json.success) data.push(json.output);
            else throw new Error(`Failed parsing data from database. ${path}`);
        });

        set(data);
    });

    function find(id: string) {
        return get(store).find(item => item.id === id);
    }

    function findByName(name: string) {
        return get(store).find(item => item.name === name);
    }

    function values() {
        return get(store);
    }

    return {
        find,
        findByName,
        values,
        set,
        subscribe,
        update,
        unsubscribe,
    };
}

export type Store<T extends ID> = ReturnType<typeof initStore<T>>;
