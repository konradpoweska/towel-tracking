<script lang="ts">
    import { DataTable, Tile } from "carbon-components-svelte";

    export let data;
</script>

{#each data.homes as home}
    <Tile>
        <h3>{home.name}</h3>
        <DataTable
            headers={[
                { key: "name", value: "Name" },
                { key: "usedBy.name", value: "User" },
                { key: "usedSince", value: "Used since" },
            ]}
            rows={home.towels.map(({ _id, ...props }) => ({ id: _id, ...props }))}
        >
            <svelte:fragment slot="cell" let:cell>
                {#if cell.key === "usedSince"}
                    {new Date(cell.value).toLocaleDateString()}
                {:else}
                    {cell.value}
                {/if}
            </svelte:fragment>
        </DataTable>
    </Tile>
{/each}
