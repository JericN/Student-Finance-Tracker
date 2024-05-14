<script lang="ts">
    import { LockClosed, User } from '@steeze-ui/heroicons';
    import { resetPassword, updateProfileName } from '$lib/firebase/auth';
    import { CardButton } from '$lib/components/modules';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    function updatePassword() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Password Update',
            body: 'We will send you an email to update your password.',
            response: (res: boolean) => {
                if (res) resetPassword();
            },
        });
    }

    function updateUsername() {
        modalStore.trigger({
            type: 'prompt',
            title: 'Username Update',
            body: 'Provide a new username.',
            value: 'username',
            valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true },
            response: (res: string) => {
                if (res) updateProfileName(res);
            },
        });
    }
</script>

<div class="flex h-full flex-col items-center gap-2 p-10">
    <CardButton layout="justify-between" font="font-bold" on:click={updateUsername}>
        <div class="flex flex-col items-center">
            <Icon src={User} class="w-6" />
        </div>
        <div class="text-md my-auto">Update Username</div>
    </CardButton>
    <CardButton layout="justify-between" font="font-bold" on:click={updatePassword}>
        <div class="flex flex-col items-center">
            <Icon src={LockClosed} class="w-6" />
        </div>
        <div class="text-md my-auto">Update Password</div>
    </CardButton>
</div>
