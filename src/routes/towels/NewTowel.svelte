<script lang="ts" context="module">
  import { invalidate } from "$app/navigation";
  import { Button, Modal, TextInput } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";

  const sendRequest = async (homeId: string, name: string) => {
    const res = await fetch(`/api/homes/${homeId}/towels/use`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error(await res.json());
  };
</script>

<script lang="ts">
  export let homeId: string;

  let open: boolean;
  let value: string;

  const resetState = () => {
    open = false;
    value = "";
  };
  resetState();

  $: valid = value.length > 1;

  const submit = async () => {
    await sendRequest(homeId, value);
    invalidate("db:towels");
    resetState();
  };
</script>

<Button
  on:click={() => (open = true)}
  iconDescription="Add towel"
  icon={Add}
  size="small"
  kind="secondary"
  tooltipPosition="right"
/>

<Modal
  bind:open
  modalHeading="Add towel"
  primaryButtonText="Add"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="input"
  primaryButtonDisabled={!valid}
  on:click:button--secondary={resetState}
  on:submit={submit}
>
  <TextInput bind:value labelText="Towel name" />
</Modal>
