<script lang="ts">
    export let date: Date;

    let [_date] = date.toISOString().split('T');
    $: date = new Date(_date);
</script>

<div class="input-label">Date</div>
<input bind:value={_date} class="input py-1 text-sm" type="date" />
