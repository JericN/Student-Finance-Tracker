<script lang="ts">
    import { CreditCard, Home, PlusCircle, PresentationChartLine, User } from '@steeze-ui/heroicons';
    import { Tab, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { page } from '$app/stores';

    $: ({ pathname } = $page.url);
    let isOpen = 0;
</script>

<TabGroup
    active="variant-filled-primary"
    class="bg-surface-200-700-token w-full"
    hover="hover:variant-soft-primary"
    justify="justify-center"
>
    <TabAnchor href="/dashboard" selected={pathname === '/dashboard/'}>
        <Icon src={Home} class="h-8" />
    </TabAnchor>
    <TabAnchor href="/transactions" selected={pathname === '/transactions/'}>
        <Icon src={CreditCard} class="h-8" />
    </TabAnchor>
    <Tab bind:group={isOpen} name="add" value={0} class="bg-surface-700-200-token pb-0">
        <button class="text-surface-50-900-token btn h-8 p-0 active:scale-75">
            <Icon src={PlusCircle} />
        </button>
    </Tab>
    <TabAnchor href="/analytics" selected={pathname === '/analytics/'}>
        <Icon src={PresentationChartLine} class="h-8" />
    </TabAnchor>
    <TabAnchor href="/users" selected={pathname === '/users/'}>
        <Icon src={User} class="h-8" />
    </TabAnchor>
</TabGroup>
