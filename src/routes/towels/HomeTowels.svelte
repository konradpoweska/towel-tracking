<script lang="ts" context="module">
  import { invalidate } from "$app/navigation";
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  import { AccordionItem, Button } from "carbon-components-svelte";
  import Towel from "./Towel.svelte";

  async function washTowels(towelIds: string[], homeId: string): Promise<void> {
    const f = await fetch(`/api/homes/${homeId}/towels/wash`, {
      method: "POST",
      body: JSON.stringify({ towelIds }),
    });
    if (!f.ok) throw new Error();
  }

  type HTowel = HomeTowels<string, string>["towels"][number];
  type PartitionedTowels = Record<"my" | "others" | "unused", HTowel[]>;

  const partitionTowels = (towels: HTowel[], userId: string) =>
    towels.reduce(
      (acc, towel) => {
        (towel.user
          ? towel.user._id === userId
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
  import { ChevronDown, RainDrop } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";

  export let home: HomeTowels<string, string>;
  export let userId: string;

  export let open: boolean = false;

  $: partitionedTowels = partitionTowels(home.towels, userId);

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
      console.error(err);
    }
    resetWashingMode();
    invalidate("db:towels");
  }

  let showOthersTowels = false;
</script>

<AccordionItem bind:open>
  <h3 slot="title">{home.name}</h3>
  <section class="actions">
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
  </section>
  <div class="towels-container">
    {#each partitionedTowels.my as towel}
      <Towel
        {towel}
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
        <Towel
          {towel}
          selectable={washingMode}
          bind:selected={towelIsSelected[towel._id]}
          showUser
        />
      {/each}
    </div>
  {/if}
</AccordionItem>

<style>
  .actions {
    display: flex;
    margin-top: 0.6em;
    margin-bottom: 1.6em;
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
