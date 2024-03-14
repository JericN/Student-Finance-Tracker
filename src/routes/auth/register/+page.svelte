<script lang="ts">
    import { error, success } from '$lib/funcs/toast';
    import Button from '$lib/components/Button.svelte';
    import Card from '$lib/components/Card.svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { registerWithMail } from '$lib/firebase/auth';

    let username: string;
    let email: string;
    let password: string;
    const toast = getToastStore();

    async function register() {
        // TODO: Add form validation
        try {
            await registerWithMail(username, email, password);
            toast.trigger(success('Register Successful'));
            goto('/user/dashboard/');
        } catch (_) {
            toast.trigger(error('Register Failed'));
        }
    }
</script>

<div class="mx-10 -mt-10 flex h-full flex-col items-center justify-center gap-10">
    <div class="text-primary-900-100-token text-5xl font-bold">Register<br /> Account</div>
    <Card width="max-w-sm" layout="space-y-4">
        <div class="grid gap-4">
            <input bind:value={username} class="input" type="text" placeholder="Username" />
            <input bind:value={email} class="input" type="email" placeholder="Email" />
            <input bind:value={password} class="input" type="password" placeholder="Password" />
        </div>

        <div class="flex font-bold text-primary-900">
            <Button width="full" accent="bg-expense" padding="p-2" on:click={register}>Register</Button>
        </div>
    </Card>
    <a href="/auth/login" class="underline">Return to Login</a>
</div>
