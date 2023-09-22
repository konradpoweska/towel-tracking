<script lang="ts">
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  import { Checkbox, Tile } from "carbon-components-svelte";

  export let towel: HomeTowels<string, string>["towels"][number];
  export let showUser = false;
  export let selectable = false;
  export let selected = false;
</script>

<div class="towel" class:selectable class:selected>
  <Tile
    class="tile"
    on:click={() => selectable && (selected = !selected)}
    color="blue"
  >
    <div class="main">
      <h5 class="title">{towel.name}</h5>
      {#if showUser && towel.user}
        <p>{towel.user.name}</p>
      {/if}
      {#if towel.usedSince}
        <p>Used since {towel.usedSince}</p>
      {/if}
    </div>
    {#if selectable}
      <Checkbox
        class="selection"
        checked={selected}
        on:click={(e) => {
          e.preventDefault();
        }}
      />
    {/if}
  </Tile>
</div>

<style>
  .towel {
    margin-bottom: 5px;
  }
  .towel.selected {
    outline: "focus" solid 2px;
  }
  .towel.selectable {
    cursor: pointer;
  }
  .towel :global(.tile) {
    display: flex;
    justify-content: space-between;
  }
  .towel :global(.selection) {
    flex: 0 0 0;
  }
  .title {
    margin-bottom: 0.4em;
  }
</style>
