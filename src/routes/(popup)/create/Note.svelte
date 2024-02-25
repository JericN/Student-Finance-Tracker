<script lang="ts">
    export let note: string;
</script>

<div class="mt-5">
    <textarea bind:value={note} class="textarea" rows="2" placeholder="Notes" />
</div>
