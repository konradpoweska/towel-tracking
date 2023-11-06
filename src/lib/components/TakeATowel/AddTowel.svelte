<script lang="ts" context="module">
  import { invalidate } from "$app/navigation";
  import { request } from "$lib/request";
  import { Modal, TextInput } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
</script>

<script lang="ts">
  export let homeId: string;

  const dispatch = createEventDispatcher<{ submit: undefined }>();

  let open = false;
  let value: string;

  export const openModal = () => {
    open = true;
    value = "";
  };

  $: valid = value?.length > 1;

  const submit = async () => {
    await request(fetch, `/api/homes/${homeId}/towels/use`, {
      method: "POST",
      body: JSON.stringify({ name: value }),
    });
    invalidate("towels");
    open = false;
    dispatch("submit");
  };
</script>

<Modal
  bind:open
  modalHeading={$_("takingATowel.addTowel")}
  primaryButtonText={$_("takingATowel.addTowel")}
  secondaryButtonText={$_("cancel")}
  selectorPrimaryFocus="input"
  primaryButtonDisabled={!valid}
  on:click:button--secondary={() => (open = false)}
  on:submit={submit}
>
  <TextInput bind:value labelText={$_("takingATowel.towelName")} />
</Modal>
