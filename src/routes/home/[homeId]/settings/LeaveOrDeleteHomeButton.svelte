<script context="module" lang="ts">
  const leaveHome = (homeId: string) =>
    request(fetch, `/api/homes/${homeId}`, {
      method: "DELETE",
    });
</script>

<script lang="ts">
  import { Button, Modal } from "carbon-components-svelte";
  import { _ } from "svelte-i18n";
  import type { Home } from "../+layout";
  import { request } from "$lib/request";
  import { goto } from "$app/navigation";
  import { addNotification } from "$lib/components/Notifications/store";
  import { Exit, Delete } from "carbon-icons-svelte";

  export let home: Home;
  let isOpen = false;

  $: canDelete = home.members.length === 1;
  $: action = canDelete ? "delete" : "leave";
  $: Icon = canDelete ? Delete : Exit;
</script>

<Button
  kind="danger-ghost"
  on:click={() => (isOpen = true)}
  {...$$restProps}
  icon={Icon}
>
  {$_(`home.${action}.header`)}
</Button>
<Modal
  danger
  bind:open={isOpen}
  modalHeading={$_(`home.${action}.header`)}
  secondaryButtonText={$_("cancel")}
  primaryButtonText={$_(`home.${action}.header`)}
  primaryButtonIcon={Icon}
  on:click:button--secondary={() => (isOpen = false)}
  on:submit={async () => {
    await leaveHome(home._id);
    addNotification({ kind: "success", title: $_(`home.${action}.success`) });
    isOpen = false;
    throw goto("/");
  }}
>
  {@html $_(`home.${action}.info`, { values: { home: home.name } })}
</Modal>
