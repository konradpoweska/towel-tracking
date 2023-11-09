<script lang="ts">
  import UsageTime from "$lib/components/UsageTime.svelte";
  import { Checkbox, Tile } from "carbon-components-svelte";
  import type { Home } from "../+layout";
  import type { Towel } from "./+page";
  import { _ } from "svelte-i18n";

  export let towel: Towel;
  export let home: Home;
  export let showUser = false;
  export let selectable = false;
  export let selected = false;

  const getUserName = (userId: string): string =>
    home.members.find((m) => m._id === userId)?.name ?? $_("unknown_user");
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
        <p>{getUserName(towel.user)}</p>
      {/if}
      {#if towel.usedSince}
        <UsageTime usedSince={new Date(towel.usedSince)} />
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
