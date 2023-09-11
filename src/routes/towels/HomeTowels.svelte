<script lang="ts">
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  import { AccordionItem } from "carbon-components-svelte";
  import Towel from "./Towel.svelte";

  export let home: HomeTowels<string, string>;
  export let userId: string;
  export let open: boolean = false;

  type Towel = HomeTowels<string, string>["towels"][number];

  type PartitionedTowels = Record<"my" | "others" | "unused", Towel[]>;
  $: partitionedTowels = home.towels.reduce(
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

<AccordionItem {open}>
  <h3 slot="title">{home.name}</h3>
  <div>
    <h4 class="title">My towels</h4>
    {#each partitionedTowels.my as towel}
      <Towel {towel} />
    {:else}
      No towels
    {/each}
  </div>
  <div>
    <h4 class="title">Others' towels</h4>
    {#each partitionedTowels.others as towel}
      <Towel {towel} showUser />
    {/each}
  </div>
</AccordionItem>

<style>
  .title {
    margin-bottom: 0.4em;
    margin-top: 0.8em;
  }
</style>
