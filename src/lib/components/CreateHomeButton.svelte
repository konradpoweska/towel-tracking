<script>
  import { Button } from "carbon-components-svelte";
  import { Add } from "carbon-icons-svelte";
  import { _ } from "svelte-i18n";
</script>

<Button kind="secondary" icon={Add} href="/home/create" {...$$restProps}>
  {$_("home.create_home")}
</Button>
