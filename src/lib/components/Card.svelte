<script lang="ts">
    import { type Colors, colors } from '$lib/models/types';

    export let width = 'w-full';
    export let color = 'surface' as Colors;
</script>

<div class={width}>
    <div class={`border-default translate-x-1.5 translate-y-1.5 rounded-xl ${colors[color]}`}>
        <div class="border-default -translate-x-1.5 -translate-y-1 scale-101 rounded-xl bg-surface-50">
            <slot />
        </div>
    </div>
</div>
