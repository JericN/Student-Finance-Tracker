<script lang="ts">
    export let text = 'Button' as string;
</script>

<!-- <div class={`border-default rounded-xl ${colors[accent]}`}>
    <div class={`border-default -translate-x-1.5 -translate-y-1 scale-101 rounded-xl ${background}`}>
        <slot />
    </div>
</div> -->
<div class="border-default rounded-2xl bg-red-600">
    <button
        class="border-default -translate-x-1 -translate-y-1 scale-105 rounded-2xl bg-surface-100 p-2 active:translate-x-0 active:translate-y-0"
    >
        <span class="px-4 font-bold"> {text} </span>
    </button>
</div>
