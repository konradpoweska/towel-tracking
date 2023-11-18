<script lang="ts">
  import { browser } from "$app/environment";
  import {
    Button,
    CopyButton,
    FormGroup,
    TextInput,
    Tile,
  } from "carbon-components-svelte";
  import { Close, Share } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
  import type { Home } from "../+layout";
  import Grid from "./Grid.svelte";
  import RemoveMemberModal from "./RemoveMemberModal.svelte";

  export let userId: string;
  export let home: Home;
  export let inviteLink: string;
  let openRemoveMemberModal: (member: Record<"_id" | "name", string>) => void;
</script>

<Tile>
  <h3>{$_("home.members.header")}</h3>
  <div class="members-container">
    <Grid>
      {#each home.members as member (member._id)}
        <div class="member">
          <div class="info">
            {member.name}
          </div>
          {#if member._id !== userId}
            <Button
              icon={Close}
              size="small"
              kind="danger-ghost"
              on:click={() => openRemoveMemberModal(member)}
              iconDescription={$_("home.members.remove.header")}
            />
          {/if}
        </div>
      {/each}
      <RemoveMemberModal {home} bind:open={openRemoveMemberModal} />
    </Grid>
  </div>
  <div class="invite">
    <h4>{$_("home.members.invite.header")}</h4>
    <FormGroup legendText={$_("home.members.invite.link")} class="copy-link">
      <TextInput
        readonly
        value={inviteLink}
        helperText={$_("home.members.invite.info")}
      />
      {#if browser && navigator.canShare?.({ url: inviteLink })}
        <Button
          icon={Share}
          on:click={() => navigator.share({ url: inviteLink })}
          iconDescription={$_("share")}
          kind="ghost"
        />
      {:else}
        <CopyButton
          text={inviteLink}
          iconDescription={$_("copy")}
          feedback={$_("copied")}
        />
      {/if}
    </FormGroup>
  </div>
</Tile>

<style>
  .members-container {
    margin: 1em 0 2em;
  }
  .member {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    background-color: "ui-02";
  }
  .info {
    padding: 10px;
  }
  .invite :global(.copy-link) {
    margin-top: 0.6em;
    display: flex;
    margin-bottom: 0;
  }
</style>
