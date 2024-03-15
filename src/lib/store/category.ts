import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { Category } from '$lib/models/types';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const CATEGORIES = Symbol('categories');

function initStore() {
    const store = writable<Category[]>([]);
    const { set, subscribe, update } = store;

    const q = query(collection(db, `UserData/${session.uid()}/categories`));

    const unsubscribe = onSnapshot(q, querySnap => {
        const categories: Category[] = [];
        if (querySnap.metadata.hasPendingWrites) return;
        querySnap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Category, value);
            if (json.success) categories.push(json.output);
            else throw new Error('Failed parsing category');
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

type Store = ReturnType<typeof initStore>;

export function init() {
    setContext(CATEGORIES, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(CATEGORIES)) throw new Error('Failed to initialize category store');
    return getContext<Store>(CATEGORIES);
}
