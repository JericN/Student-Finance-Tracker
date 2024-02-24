<script>
    import { AppBar } from '@skeletonlabs/skeleton';
    import { ChevronDoubleLeft } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
</script>

<AppBar background="bg-primary-900" padding="p-4" slotDefault="text-surface-100" slotLead="text-surface-100">
    <button slot="lead" on:click={() => window.history.back()}>
        <Icon class="w-6 stroke-2" src={ChevronDoubleLeft} />
    </button>
    <div class="text-xl font-bold leading-none">New Transaction</div>
</AppBar>
