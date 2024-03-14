import { collection, onSnapshot, query } from 'firebase/firestore';
import { getContext, hasContext, setContext } from 'svelte';
import { Template } from '$lib/models/types';
import { db } from '$lib/firebase/firebase.client';
import { safeParse } from 'valibot';
import { session } from '$lib/store/session';
import { writable } from 'svelte/store';

const TEMPLATES = Symbol('templates');

// TODO: validate correctness
function initStore() {
    const store = writable<Template[]>([]);
    const { set, subscribe, update } = store;

    const q = query(collection(db, `UserData/${session.uid()}/transaction-templates`));

    const unsubscribe = onSnapshot(q, querySnap => {
        const templates: Template[] = [];
        if (querySnap.metadata.hasPendingWrites) return;
        querySnap.forEach(doc => {
            const value = { ...doc.data(), id: doc.id };
            const json = safeParse(Template, value);
            if (json.success) templates.push(json.output);
            else throw new Error('Failed parsing transaction');
        });
        set(templates);
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
    setContext(TEMPLATES, initStore() satisfies Store);
}

export function get() {
    if (!hasContext(TEMPLATES)) throw new Error('Failed to initialize editing store');
    return getContext<Store>(TEMPLATES);
}
