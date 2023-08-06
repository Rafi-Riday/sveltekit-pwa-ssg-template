<script>
    import { onMount } from "svelte";

    let sample_data = [];

    // fetching sample to check PWA
    onMount(() => {
        fetch("sample_data.json")
            .then((res) => res.json())
            .then((d) => (sample_data = d))
            .catch(() => (d = []));
    });
</script>

<main>
    <span>Hi</span>

    <span>Sample Data :</span>
    {#each sample_data as d}
        <li>{d}</li>
    {/each}
</main>
