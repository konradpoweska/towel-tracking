<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { Add } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
</script>

<Button
  kind="secondary"
  icon={Add}
  href="/home/create"
  on:click
  {...$$restProps}
>
  {$_("home.createHome")}
</Button>
