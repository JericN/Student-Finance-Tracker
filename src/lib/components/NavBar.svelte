<script lang="ts">
    import { CreditCard, Home, PlusCircle, PresentationChartLine, User } from '@steeze-ui/heroicons';
    import { Tab, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    $: ({ pathname } = $page.url);
    let isOpen = 0;
</script>

<TabGroup
    hover="hover:variant-soft-primary"
    active="variant-filled-primary"
    class="bg-surface-200-700-token w-full"
    justify="justify-center"
>
    <TabAnchor href="/user/dashboard" selected={pathname === '/user/dashboard/'}>
        <Icon src={Home} class="w-8" />
    </TabAnchor>
    <TabAnchor href="/user/transactions" selected={pathname === '/user/transactions/'}>
        <Icon src={CreditCard} class="w-8" />
    </TabAnchor>
    <Tab bind:group={isOpen} name="add" value={0} class="bg-surface-700-200-token pb-0">
        <button
            class="text-surface-50-900-token btn w-8 p-0 active:scale-75"
            on:click={() => goto('/user/transactions/create')}
        >
            <Icon src={PlusCircle} />
        </button>
    </Tab>
    <TabAnchor href="/user/analytics" selected={pathname === '/user/analytics/'}>
        <Icon src={PresentationChartLine} class="w-8" />
    </TabAnchor>
    <TabAnchor href="/user/users" selected={pathname === '/user/users/'}>
        <Icon src={User} class="w-8" />
    </TabAnchor>
</TabGroup>
