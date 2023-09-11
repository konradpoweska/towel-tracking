<script lang="ts">
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  import { Tile } from "carbon-components-svelte";

  export let towel: HomeTowels<string, string>["towels"][number];
  export let showUser: boolean = false;
</script>

<Tile>
  <h5 class="title">{towel.name}</h5>
  {#if showUser && towel.user}
    <p>{towel.user.name}</p>
  {/if}
  {#if towel.usedSince}
    <p>Used since {towel.usedSince}</p>
  {/if}
</Tile>

<style>
  .title {
    margin-bottom: 0.4em;
  }
</style>
