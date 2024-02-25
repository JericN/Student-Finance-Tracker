<script lang="ts">
    import { type Days, days } from '$lib/models/types';

    export let date: number;

    const colors: Record<Days, string> = {
        Sun: 'text-red-900',
        Mon: 'text-green-900',
        Tue: 'text-teal-900',
        Wed: 'text-cyan-900',
        Thu: 'text-blue-900',
        Fri: 'text-indigo-900',
        Sat: 'text-fuchsia-900',
    };

    // FIXME: correct the day mapping
    const day = days[date % 7];
    const color = colors[day];
</script>

<span class={`grid h-3 w-4 place-items-center rounded-sm bg-white leading-none`}>
    <span class={`${color} text-3xs font-bold`}>
        {day}
    </span>
</span>
