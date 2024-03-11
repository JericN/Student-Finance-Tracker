<script lang='ts'>
    import Card from '$lib/components/Card.svelte';
    export let title: string;

    let deviceWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        deviceWidth = window.innerWidth;
    });

    function update(deviceWidth: number): string {
        switch (true) {
            case deviceWidth > 440:
                return "w-2/4";
            default:
                return "w-3/4";
        }
    }

    $: cardWidth = update(deviceWidth);
</script>
<Card width={`${cardWidth} flex-none`} padding="px-6">
    <div class="justify-between text-dark">
        <div class="flex flex-col items-start">
            <div class="text-2x1 font-bold">{title}</div>
        </div>
        <div class="flex flex-col my-auto text-2xl items-end">
            <slot></slot>
        </div>
    </div>
</Card>