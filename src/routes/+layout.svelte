<script>
    import "../app.css";
    import { onMount } from "svelte";

    // pwa functionality
    import { pwaInfo } from "virtual:pwa-info";
    let updating = false;

    const updateUI = (data) => {
        updating = !updating;
    };

    onMount(async () => {
        if (pwaInfo) {
            const { registerSW } = await import("virtual:pwa-register");
            registerSW({
                immediate: true,
                onRegistered(r) {
                    // console.log(`SW Registered: ${r}`);
                },
                onRegisterError(error) {
                    // console.log("SW registration error", error);
                },
            });
        }
        // Listen for cache updates
        const cacheUpdatesChannel = new BroadcastChannel("cache-updates");
        cacheUpdatesChannel.onmessage = (event) => {
            if (
                event.data.type === "CACHE_UPDATED" ||
                event.data.type === "IMAGE_CACHE_UPDATED"
            ) {
                console.log("Cache updated:", event.data.request);
                // Update the UI with the latest data
                updateUI(event.data.response);
            }
        };
    });

    $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

{#key updating}
    <slot />
{/key}
