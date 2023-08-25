<script lang="ts">
  import "carbon-components-svelte/css/white.css";
  import { Column, Content, Grid, Header, Row } from "carbon-components-svelte";
  let isSideNavOpen: boolean = false;
</script>

<Header platformName="Towel Monitoring" bind:isSideNavOpen />
<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>
