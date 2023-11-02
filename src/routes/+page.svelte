<script>
  import CreateHomeButton from "$lib/components/CreateHomeButton.svelte";
  import { _ } from "svelte-i18n";
</script>

<div>
  {$_("home.none")}
</div>
<CreateHomeButton />
