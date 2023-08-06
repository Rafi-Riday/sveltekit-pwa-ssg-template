<script>
    const imports = {
        PageNotFound: () => import("$lib/PageNotFound.svelte"),
    };
</script>

{#await imports["PageNotFound"]() then PageNotFound}
    <svelte:component this={PageNotFound.default} />
{/await}
