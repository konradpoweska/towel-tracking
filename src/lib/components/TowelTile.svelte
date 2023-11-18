<script lang="ts">
  import UsageTime from "$lib/components/UsageTime.svelte";
  import { Tile } from "carbon-components-svelte";
  import { _ } from "svelte-i18n";
  import type { Towel } from "../../routes/api/homes/[homeId]/towels/+server";
  import type { Home } from "../../routes/home/[homeId]/+layout";

  export let towel: Towel;
  export let home: Home;
  export let showUser = false;

  $: getUserName = (userId: string): string =>
    home.members.find((m) => m._id === userId)?.name ?? $_("unknownUser");
</script>

<wrapper {...$$restProps}>
  <Tile on:click {...$$restProps} class={`tile ${$$restProps.class ?? ""}`}>
    <div class="info">
      <h5 class="title">{towel.name}</h5>
      <div class="usage">
        {#if showUser && towel.user}
          <div>
            {getUserName(towel.user)}
          </div>
        {/if}
        {#if towel.usedSince}
          <UsageTime usedSince={new Date(towel.usedSince)} />
        {/if}
      </div>
    </div>
    <slot />
  </Tile>
</wrapper>

<style>
  wrapper {
    display: contents;
  }
  wrapper :global(.tile) {
    display: flex;
    justify-content: space-between;
  }
  .info {
    justify-content: center;
  }
  .info,
  .usage {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }
</style>
