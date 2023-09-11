<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  import { Tag } from "carbon-components-svelte";

  export let homeId: string;
  export let towels: Towel[];

  type Towel = HomeTowels<string, string>["towels"][number];

  const useTowel = async (towel: Towel): Promise<void> => {
    const f = await fetch(`api/homes/${homeId}/towels/${towel._id}/use`, {
      method: "POST",
    });
    invalidate("db:towels");
    if (!f.ok) throw new Error();
  };
</script>

{#each towels as towel}
  <Tag interactive on:click={() => useTowel(towel)}>{towel.name}</Tag>
{/each}
