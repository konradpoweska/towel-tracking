<script lang="ts">
  import { page } from "$app/stores";
  import CreateHomeButton from "$lib/components/CreateHomeButton.svelte";
  import Notifications from "$lib/components/Notifications/Component.svelte";
  import {
    Column,
    Content,
    Grid,
    Header,
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderUtilities,
    Row,
  } from "carbon-components-svelte";
  import "carbon-components-svelte/css/white.css";
  import { Home } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";

  let isOpenHomeSelector: boolean = false;
  const closeHomeSelector = () => (isOpenHomeSelector = false);
  export let data;
</script>

<svelte:head>
  <title>{$_("title")}</title>
</svelte:head>

<Notifications />
<Header platformName={$_("title")}>
  <HeaderUtilities>
    <HeaderAction bind:isOpen={isOpenHomeSelector} icon={Home}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>{$_("home.goto")}</HeaderPanelDivider>
        <div class="homes">
          {#each data.homes as home}
            <HeaderPanelLink
              href={`/home/${home._id}/`}
              on:click={closeHomeSelector}
              data-sveltekit-preload-data="off"
              class={$page.params.homeId === home._id ? "active" : undefined}
            >
              {home.name}
            </HeaderPanelLink>
          {/each}
        </div>
        <li class="createHome">
          <CreateHomeButton on:click={closeHomeSelector} />
        </li>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>
<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>

<style>
  .createHome {
    padding: 2em 1em 0.2em;
  }
  .homes :global(.active) {
    color: white;
  }
</style>
