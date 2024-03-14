<script lang="ts">
    export let description: string | undefined;
</script>

<div class="mt-5">
    <textarea bind:value={description} class="textarea" rows="2" placeholder="Notes" />
</div>
