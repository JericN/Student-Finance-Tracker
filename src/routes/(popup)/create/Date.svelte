<script lang="ts">
    export let date: string;
</script>

<div class="input-label">Date</div>
<input bind:value={date} class="input py-1 text-sm" type="date" />
