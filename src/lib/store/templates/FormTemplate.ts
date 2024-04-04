import { get, writable } from 'svelte/store';

export function initStore<T>() {
    const store = writable<Partial<T>>({});

    const { set, subscribe } = store;

    function values() {
        return get(store);
    }

    function save(data: T) {
        set(data);
    }

    function reset() {
        set({});
    }

    return {
        save,
        set,
        subscribe,
        values,
        reset,
    };
}

export type Store<T> = ReturnType<typeof initStore<T>>;
