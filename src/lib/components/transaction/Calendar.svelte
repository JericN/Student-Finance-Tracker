<script lang="ts">
    export let date: Date | undefined;

    let [_date] = date ? date.toISOString().split('T') : new Date().toISOString().split('T');
    $: date = new Date(_date);
</script>

<div class="input-label">Date</div>
<input bind:value={_date} class="input py-1 text-sm" type="date" />
