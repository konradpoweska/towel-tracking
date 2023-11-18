<script context="module" lang="ts">
  import { invalidate } from "$app/navigation";
  import { request } from "$lib/request.js";

  const deleteMember = async (homeId: string, memberId: string) => {
    await request(fetch, `/api/homes/${homeId}/members/${memberId}`, {
      method: "DELETE",
    });
  };

  type Member = Record<"_id" | "name", string>;
</script>

<script lang="ts">
  import { addNotification } from "$lib/components/Notifications/store";
  import { Modal } from "carbon-components-svelte";
  import { TrashCan } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
  import type { Home } from "../+layout";

  let isOpen = false;
  export let home: Home;
  let member: Member;
  export const open = (_member: Member) => {
    member = _member;
    isOpen = true;
  };
</script>

<Modal
  bind:open={isOpen}
  danger
  primaryButtonText={$_("remove")}
  primaryButtonIcon={TrashCan}
  modalHeading={$_("home.members.remove.header")}
  secondaryButtonText={$_("cancel")}
  on:click:button--secondary={() => (isOpen = false)}
  on:submit={async () => {
    await deleteMember(home._id, member._id);
    addNotification({
      kind: "success",
      title: $_("home.members.remove.success"),
    });
    invalidate("home");
    isOpen = false;
  }}
>
  {#if member}
    <p>
      {@html $_("home.members.remove.info", {
        values: { member: member.name, home: home.name },
      })}
    </p>
  {/if}
</Modal>
