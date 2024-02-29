import { type Output, boolean, number, object, required, safeParse, string } from 'valibot';
import { localStorageStore } from '@skeletonlabs/skeleton';
const initial = {
    id: 0,
    name: 'Guest',
    email: 'guest@localhost',
    auth: false,
};

const User = object({
    id: number(),
    name: string(),
    email: string(),
    auth: boolean(),
});

type User = Output<typeof User>;

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
