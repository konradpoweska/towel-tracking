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
  import { RainDrop } from "carbon-icons-svelte";
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
</script>

<AccordionItem {open} class="container">
  <h3 slot="title">{home.name}</h3>
  <section>
    <h4>My towels</h4>
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
    <TakeATowel homeId={home._id} towels={partitionedTowels.unused} />
  </section>
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
  <section class="actions">
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
        on:click={() => (washingMode = true)}
        icon={RainDrop}
      >
        {$_("washing.washTowels")}
      </Button>
    {/if}
  </section>
</AccordionItem>

<style>
  .actions {
    display: flex;
    gap: 1px;
    margin-top: 4em;
  }
  section {
    margin-top: 1em;
    margin-bottom: 3em;
  }
  section h4 {
    margin-bottom: 1em;
  }
  .towels-container {
    margin-bottom: 1em;
  }
</style>
