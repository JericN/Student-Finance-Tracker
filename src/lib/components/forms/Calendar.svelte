<script lang="ts" context="module">
    // HACK: workaround for complicated format of date input
    function format(date: Date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
</script>

<script lang="ts">
    export let date: Date | undefined;

    let _date = date ? format(date) : format(new Date());
    $: date = new Date(new Date(_date).setHours(0, 0, 0, 0));
</script>

<div class="input-label">Date</div>
<input bind:value={_date} class="input py-1 text-sm" type="date" />
