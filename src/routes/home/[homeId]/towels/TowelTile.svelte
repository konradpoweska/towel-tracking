<script lang="ts">
  import TowelTile from "$lib/components/TowelTile.svelte";
  import { Checkbox } from "carbon-components-svelte";
  import type { Home } from "../+layout";
  import type { Towel } from "./+page";

  export let towel: Towel;
  export let home: Home;
  export let showUser = false;
  export let selectable = false;
  export let selected = false;
</script>

<wrapper class:selected class:selectable>
  <TowelTile
    {home}
    {towel}
    {showUser}
    on:click={() => selectable && (selected = !selected)}
    {...$$restProps}
  >
    {#if selectable}
      <Checkbox
        class="selection"
        checked={selected}
        on:click={(e) => {
          e.preventDefault();
        }}
      />
    {/if}
  </TowelTile>
</wrapper>

<style>
  wrapper {
    display: contents;
  }
  wrapper.selected :global(.tile) {
    outline: "focus" solid 2px;
  }
  wrapper.selectable :global(.tile) {
    cursor: pointer;
  }
  wrapper > :global(* .selection) {
    flex: 0 0 0;
  }
</style>
