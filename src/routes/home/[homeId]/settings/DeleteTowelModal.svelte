<script context="module" lang="ts">
  import { invalidate } from "$app/navigation";
  import { request } from "$lib/request.js";

  const deleteTowel = async (homeId: string, towelId: string) => {
    await request(fetch, `/api/homes/${homeId}/towels/${towelId}`, {
      method: "DELETE",
    });
    invalidate("towels");
  };
</script>

<script lang="ts">
  import { addNotification } from "$lib/components/Notifications/store";
  import { Modal } from "carbon-components-svelte";
  import { TrashCan } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
  import type { Towel } from "./+page";

  let isOpen = false;
  let towel: Towel;

  export let homeId: string;
  export const open = (_towel: Towel) => {
    towel = _towel;
    isOpen = true;
  };
</script>

<Modal
  bind:open={isOpen}
  danger
  primaryButtonText={$_("delete")}
  primaryButtonIcon={TrashCan}
  modalHeading={$_("towel.delete.header")}
  secondaryButtonText={$_("cancel")}
  on:click:button--secondary={() => (isOpen = false)}
  on:submit={async () => {
    await deleteTowel(homeId, towel._id);
    addNotification({ kind: "success", title: $_("towel.delete.success") });
    isOpen = false;
  }}
>
  {#if towel}
    <p>
      {@html $_("towel.delete.info", {
        values: { towel: towel.name },
      })}
    </p>
  {/if}
</Modal>
