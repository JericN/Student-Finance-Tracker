<script lang="ts">
    export let icon: string = '';
    let flag = false;
</script>

<div class="input-label">Icon</div>
<div class={`${flag && 'border-red-500 dark:border-red-500'} input-group input-group-divider grid-cols-[auto_1fr]`}>
    <input
        bind:value={icon}
        class="py-1 text-sm"
        type="text"
        on:change={() => {
            flag = icon.length === 0 || icon.length > 30;
        }}
    />
</div>
