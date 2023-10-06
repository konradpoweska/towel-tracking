<script lang="ts" context="module">
  import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";
  type Towel = HomeTowels<string, string>["towels"][number];
</script>

<script lang="ts">
  import AddTowel from "./AddTowel.svelte";
  import UseTowel from "./UseTowel.svelte";
  import { Add } from "carbon-icons-svelte";
  import { Button } from "carbon-components-svelte";
  import { _ } from "svelte-i18n";

  export let homeId: string;
  export let towels: Towel[];

  let openUseTowelModal: () => void;
  let openAddTowelModal: () => void;
  let useTowelModalIsOpen: boolean;
</script>

<Button on:click={openUseTowelModal} icon={Add}>{$_("takingATowel.takeATowel")}</Button>
<UseTowel
  {homeId}
  {towels}
  bind:openModal={openUseTowelModal}
  bind:open={useTowelModalIsOpen}
  on:cantFindTowel={openAddTowelModal}
/>
<AddTowel
  {homeId}
  bind:openModal={openAddTowelModal}
  on:submit={() => (useTowelModalIsOpen = false)}
/>
