<script lang="ts">
  import "carbon-components-svelte/css/white.css";
  import { Column, Content, Grid, Header, Row } from "carbon-components-svelte";
  let isSideNavOpen: boolean = false;
  import { _ } from "svelte-i18n";
</script>

<svelte:head>
  <title>{$_("title")}</title>
</svelte:head>

<Header platformName={$_("title")} bind:isSideNavOpen />
<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>
