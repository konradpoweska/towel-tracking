<script lang="ts" context="module">
  import { invalidate } from "$app/navigation";
  import { request } from "$lib/request";
  import { Modal, TextInput } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import { addNotification } from "../Notifications/store";
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
    await request(fetch, `/api/homes/${homeId}/towels`, {
      method: "POST",
      body: JSON.stringify({ name: value, use: true }),
    });
    invalidate("towels");
    open = false;
    dispatch("submit");
    addNotification({ kind: 'success', title: $_("towel.addTowel.success") });
  };
</script>

<Modal
  bind:open
  modalHeading={$_("towel.addTowel.header")}
  primaryButtonText={$_("towel.addTowel.header")}
  secondaryButtonText={$_("cancel")}
  selectorPrimaryFocus="input"
  primaryButtonDisabled={!valid}
  on:click:button--secondary={() => (open = false)}
  on:submit={submit}
>
  <TextInput bind:value labelText={$_("towel.towelName")} />
</Modal>
