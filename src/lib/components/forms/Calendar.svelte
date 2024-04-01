<script lang="ts" context="module">
    // HACK: workaround for complicated format of date input
    function format(date: Date | undefined) {
        if (!date) date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // HACK: workaround for complicated format of date input
    function update(value: Date | string) {
        if (value instanceof Date) value = value.toString();
        return new Date(new Date(value).setHours(0, 0, 0, 0));
    }
</script>

<script lang="ts">
    export let date: Date | undefined;

    $: date = typeof date === 'undefined' ? update(new Date()) : date;
    $: formattedDate = format(date);
</script>

<div class="input-label">Date</div>
<input
    class="input py-1 text-sm"
    type="date"
    value={formattedDate}
    on:change={({ currentTarget }) => (date = update(currentTarget.value))}
/>
