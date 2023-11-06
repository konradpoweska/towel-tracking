<script lang="ts" context="module">
  import { invalidate } from "$app/navigation";
  import { Button } from "carbon-components-svelte";
  import TowelTile from "./TowelTile.svelte";

  async function washTowels(towelIds: string[], homeId: string): Promise<void> {
    await request(fetch, `/api/homes/${homeId}/towels/wash`, {
      method: "POST",
      body: JSON.stringify({ towelIds }),
    });
  }

  type PartitionedTowels = Record<"my" | "others" | "unused", Towel[]>;

  const partitionTowels = (towels: Towel[], userId: string) =>
    towels.reduce(
      (acc, towel) => {
        (towel.user
          ? towel.user === userId
            ? acc.my
            : acc.others
          : acc.unused
        ).push(towel);
        return acc;
      },
      { my: [], others: [], unused: [] } as PartitionedTowels
    );
</script>

<script lang="ts">
  import TakeATowel from "$lib/components/TakeATowel/TakeATowel.svelte";
  import { request } from "$lib/request";
  import { ChevronDown, RainDrop } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
  import type { Home } from "../+layout";
  import type { Towel } from "./+page";

  export let home: Home;
  export let towels: Towel[];
  export let userId: string;

  $: partitionedTowels = partitionTowels(towels, userId);

  let washingMode = false;
  let towelIsSelected: Record<string, boolean> = {};
  $: selectedTowelIds = Object.entries(towelIsSelected)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const resetWashingMode = () => {
    washingMode = false;
    towelIsSelected = {};
  };

  async function washSelectedTowels() {
    try {
      await washTowels(selectedTowelIds, home._id);
    } catch (err) {
      // TODO: improve error handling
      console.error(err);
    }
    resetWashingMode();
    invalidate("towels");
  }

  let showOthersTowels = false;
</script>

<div>
  <div class="header">
    <h3>{home.name}</h3>
    <small>{$_("home.members", { values: { members: home.members.length } })}</small>
  </div>
  <div class="actions">
    <TakeATowel
      homeId={home._id}
      towels={partitionedTowels.unused}
      disabled={washingMode}
    />
    <div>
      {#if washingMode}
        <Button
          kind="primary"
          on:click={washSelectedTowels}
          disabled={selectedTowelIds.length === 0}
        >
          {$_("washing.wash")}
        </Button>
        <Button kind="secondary" on:click={() => resetWashingMode()}>
          {$_("cancel")}
        </Button>
      {:else}
        <Button
          kind="secondary"
          on:click={() => {
            washingMode = true;
            showOthersTowels = true;
          }}
          icon={RainDrop}
        >
          {$_("washing.washTowels")}
        </Button>
      {/if}
    </div>
  </div>
  <div class="towels-container">
    {#each partitionedTowels.my as towel}
      <TowelTile
        {towel}
        {home}
        selectable={washingMode}
        bind:selected={towelIsSelected[towel._id]}
      />
    {:else}
      {$_("noTowel")}
    {/each}
  </div>
  {#if partitionedTowels.others.length}
    <div class="otherTowelsToggle" class:active={showOthersTowels}>
      <Button
        on:click={() => (showOthersTowels = !showOthersTowels)}
        kind="ghost"
        size="small"
        icon={ChevronDown}
      >
        {$_(showOthersTowels ? "hideOthersTowels" : "showOthersTowels")}
      </Button>
    </div>
  {/if}
  {#if showOthersTowels}
    <div class="towels-container">
      {#each partitionedTowels.others as towel}
        <TowelTile
          {home}
          {towel}
          selectable={washingMode}
          bind:selected={towelIsSelected[towel._id]}
          showUser
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .header {
    margin-bottom: 2em;
  }
  .actions {
    display: flex;
    margin-top: 0.6em;
    margin-bottom: 1.2em;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;
  }
  .actions > div {
    display: flex;
    gap: 1px;
  }
  .otherTowelsToggle :global(button) {
    display: flex;
    max-width: unset;
    width: 100%;
    justify-content: center;
  }
  .otherTowelsToggle.active :global(svg) {
    transform: rotate(180deg);
  }
  .towels-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 4px;
    margin: 4px 0;
  }
  @media screen and (min-width: 1200px) {
    .towels-container {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
