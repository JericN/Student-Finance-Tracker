<script lang="ts">
    export let name: string = '';
    let flag = false;
</script>

<div class="input-label">Name</div>
<div class={`${flag && 'border-red-500 dark:border-red-500'} input-group input-group-divider grid-cols-[auto_1fr]`}>
    <input
        bind:value={name}
        class="py-1 text-sm"
        type="text"
        on:change={() => {
            flag = name.length === 0 || name.length > 30;
        }}
    />
</div>
