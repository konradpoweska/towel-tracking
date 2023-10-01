<script lang="ts" context="module">
  import { invalidate } from "$app/navigation";
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  import { AccordionItem, Button } from "carbon-components-svelte";
  import AvailableTowels from "./AvailableTowels.svelte";
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
  import NewTowel from "./NewTowel.svelte";
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
</script>

<AccordionItem {open} class="container">
  <h3 slot="title">{home.name}</h3>
  <section>
    <div class="header-button">
      <h4>Take a towel</h4>
      <NewTowel homeId={home._id} />
    </div>
    <AvailableTowels homeId={home._id} towels={partitionedTowels.unused} />
  </section>
  {#if partitionedTowels.my.length}
    <section>
      <h4>My towels</h4>
      {#each partitionedTowels.my as towel}
        <Towel
          {towel}
          selectable={washingMode}
          bind:selected={towelIsSelected[towel._id]}
        />
      {/each}
    </section>
  {/if}
  {#if partitionedTowels.others.length}
    <section>
      <h4>Others' towels</h4>
      {#each partitionedTowels.others as towel}
        <Towel
          {towel}
          selectable={washingMode}
          bind:selected={towelIsSelected[towel._id]}
          showUser
        />
      {/each}
    </section>
  {/if}
  <section>
    {#if washingMode}
      <Button
        kind="primary"
        on:click={() => washSelectedTowels()}
        disabled={selectedTowelIds.length === 0}>Wash</Button
      >
      <Button kind="secondary" on:click={() => resetWashingMode()}>
        Cancel
      </Button>
    {:else}
      {@const usedTowels =
        partitionedTowels.my.length + partitionedTowels.others.length}
      {#if usedTowels}
        <Button kind="secondary" on:click={() => (washingMode = true)}>
          Wash towels
        </Button>
      {/if}
    {/if}
  </section>
</AccordionItem>

<style>
  section {
    margin: 2em 0;
  }
  section h4 {
    margin-bottom: 0.4em;
  }
  .header-button {
    display: flex;
    gap: 0.6em;
    align-items: baseline;
  }
</style>
