<script lang="ts">
    import { errorToast, successToast } from '$lib/funcs/toast';
    import Card from '$lib/components/Card.svelte';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { loginWithMail } from '$lib/firebase/auth';

    let email: string;
    let password: string;
    const toast = getToastStore();

    function login() {
        loginWithMail(email, password)
            .then(_ => {
                toast.trigger(successToast('Login successful'));
                goto('/user/dashboard');
            })
            .catch(_ => {
                toast.trigger(errorToast('Login failed'));
            });
    }

    function toregister() {
        goto('/auth/register');
    }
</script>

<div class="mx-10 -mt-10 flex h-full flex-col items-center justify-center gap-10">
    <div class="text-primary-900-100-token text-5xl font-bold">Student<br />Finance<br />Tracker</div>
    <Card width="max-w-sm" layout="space-y-4">
        <div class="grid gap-4">
            <input bind:value={email} class="input" type="email" placeholder="Username" />
            <input bind:value={password} class="input" type="password" placeholder="Password" />
        </div>

        <div class="flex font-bold text-primary-900">
            <Card width="full" accent="bg-income" padding="p-2">
                <button on:click={login} class="w-full">Login</button>
            </Card>
            <Card width="full" accent="bg-expense" padding="p-2">
                <button on:click={toregister} class="w-full">Signup</button>
            </Card>
        </div>
    </Card>
</div>
