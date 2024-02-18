<script>
    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ test } = data);
</script>

<div class="grid h-full place-content-center">Student Financial Tracker {test}</div>
