<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { Add } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
  import type { Towel } from "../../../routes/api/homes/[homeId]/towels/+server";
  import AddTowel from "./AddTowel.svelte";
  import UseTowel from "./UseTowel.svelte";

  export let homeId: string;
  export let towels: Towel[];
  export let disabled = false;

  let openUseTowelModal: () => void;
  let openAddTowelModal: () => void;
  let useTowelModalIsOpen: boolean;
</script>

<Button on:click={openUseTowelModal} icon={Add} {disabled}>
  {$_("towel.takeATowel")}
</Button>
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
