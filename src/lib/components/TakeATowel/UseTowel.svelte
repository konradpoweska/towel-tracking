<script lang="ts" context="module">
  import type { DataTableHeader } from "carbon-components-svelte/types/DataTable/DataTable.svelte";

  const headers: DataTableHeader[] = [{ key: "name", value: "Name" }];
</script>

<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { request } from "$lib/request";
  import {
    Button,
    ComposedModal,
    DataTable,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
  } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import { _ } from "svelte-i18n";
  import type { Towel } from "../../../routes/api/homes/[homeId]/towels/+server";
  import { addNotification } from "../Notifications/store";

  export let homeId: string;
  export let towels: Towel[];

  const dispatch = createEventDispatcher<{ cantFindTowel: undefined }>();

  export let open = false;
  let search: string;

  export function openModal() {
    open = true;
    search = "";
  }

  async function submit(homeId: string, towelId: string): Promise<void> {
    await request(fetch, `/api/homes/${homeId}/towels/${towelId}/use`, {
      method: "POST",
    });
    open = false;
    invalidate("towels");
    addNotification({ kind: 'success', title: $_("towel.takeATowel.success") });
  }

  $: rows = towels.map((t) => ({ id: t._id, ...t }));
</script>

<div class="container">
  <ComposedModal
    bind:open
    on:close={() => (open = false)}
    selectorPrimaryFocus="input"
  >
    <ModalHeader title={$_("towel.takeATowel.header")} />
    <ModalBody hasScrollingContent>
      <DataTable
        {headers}
        {rows}
        on:click:row={(e) => submit(homeId, e.detail._id)}
        class="table"
        stickyHeader
      >
        <Toolbar>
          <ToolbarContent>
            <ToolbarSearch
              bind:value={search}
              shouldFilterRows
              placeholder={$_("search")}
              persistent
            />
          </ToolbarContent>
        </Toolbar>
      </DataTable>
    </ModalBody>
    <ModalFooter>
      <Button on:click={() => dispatch("cantFindTowel")} kind="ghost">
        {$_("towel.cantFindTowel")}
      </Button>
    </ModalFooter>
  </ComposedModal>
</div>

<style>
  :root {
    color: blue;
  }
  .container :global(.table thead) {
    display: none;
  }
  .container :global(.table td) {
    cursor: pointer;
  }
</style>
