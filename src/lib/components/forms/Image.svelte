<script>
  import { Fileupload, Label } from 'flowbite-svelte';
  export let value;
</script>

<Label class="space-y-2 mb-2">
  <span>Upload file</span>
  <Fileupload bind:value />
</Label>
<Label>File: {value}</Label>