<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

{#each data.towels as towel}
    {towel.name} - {towel.usedBy} - {new Date(towel.usedSince).toISOString()}
{/each}
