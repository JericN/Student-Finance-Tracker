import { required, safeParse } from 'valibot';
import { User } from '$lib/models/types';
import { localStorageStore } from '@skeletonlabs/skeleton';

const initial = {
    id: 0,
    name: 'Guest',
    email: 'guest@localhost',
    auth: false,
};

export const session = localStorageStore('UserCredentials', initial, {
    serializer: {
        stringify: JSON.stringify,
        parse(text) {
            const json = JSON.parse(text);
            const result = safeParse(required(User), json);
            if (result.success) return result.output;
            return initial;
        },
    },
});
