<script lang="ts">
  import { Accordion } from "carbon-components-svelte";
  import HomeTowels from "./HomeTowels.svelte";

  export let data;
</script>

{#each data.homes as home, index}
  <Accordion>
    <HomeTowels {home} userId={data.userId} open={index === 0} />
  </Accordion>
{:else}
  <div>
    No homes. Please ask your home members to be invited in your home, or create
    one.
  </div>
{/each}
