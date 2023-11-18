<script lang="ts">
  import TowelTile from "$lib/components/TowelTile.svelte";
  import { Button, Tile } from "carbon-components-svelte";
  import { TrashCan } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
  import type { Home } from "../+layout";
  import type { Towel } from "./+page";
  import DeleteTowelModal from "./DeleteTowelModal.svelte";
  import Grid from "./Grid.svelte";

  export let home: Home;
  export let towels: Towel[];
  let openRemoveTowelModal: (towel: Towel) => void;
</script>

<Tile {...$$restProps}>
  <h3>{$_("towel.header")}</h3>
  {#if towels.length}
    <div class="towels-container">
      <Grid>
        {#each towels as towel (towel._id)}
          <TowelTile {towel} {home} showUser light>
            <Button
              icon={TrashCan}
              size="small"
              kind="danger-ghost"
              on:click={() => openRemoveTowelModal(towel)}
              iconDescription={$_("towel.delete.header")}
            />
          </TowelTile>
        {/each}
      </Grid>
    </div>
  {:else}
    <p>{$_("towel.none")}</p>
  {/if}
  <DeleteTowelModal homeId={home._id} bind:open={openRemoveTowelModal} />
</Tile>

<style>
  h3 {
    margin-bottom: 0.6em;
  }
  .towels-container {
    display: contents;
  }
  .towels-container :global(.tile) {
    padding: 0;
  }
  .towels-container :global(.info) {
    padding: 10px;
  }
  .towels-container :global(*) {
    font-size: 0.9rem;
  }
</style>
