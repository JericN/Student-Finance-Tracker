<script lang="ts">
    export let date: number;

    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const colors = [
        'bg-rose-950',
        'bg-red-950',
        'bg-amber-950',
        'bg-violet-950',
        'bg-blue-950',
        'bg-slate-950',
        'bg-pink-950',
    ];
    const day = days[date % 7];
    const color = colors[date % 7];
</script>

<span class={`${color} bg- mt-1 grid h-3 w-4 place-items-center rounded-sm text-3xs font-normal leading-none`}
    >{day}</span
>
