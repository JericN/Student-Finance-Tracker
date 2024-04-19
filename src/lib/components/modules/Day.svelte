<script lang="ts">
    import { type Days, days } from '$lib/models/sft';

    export let day: number;

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
    const text = days[day % 7];
    const color = colors[text as Days];
</script>

<span class={`grid h-3 w-5 place-items-center rounded-sm bg-white leading-none`}>
    <span class={`${color} text-3xs font-bold`}>
        {text}
    </span>
</span>
