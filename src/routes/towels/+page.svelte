<script lang="ts">
    export let data;
</script>

{#each data.homes as home}
    <h3>{home.name}</h3>
    {#each home.towels as towel}
        {towel.name} - {towel.usedBy.name} - {new Date(
            towel.usedSince
        )}
    {/each}
{/each}
