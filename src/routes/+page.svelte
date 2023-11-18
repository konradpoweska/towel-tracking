<script>
  import CreateHomeButton from "$lib/components/CreateHomeButton.svelte";
  import { _ } from "svelte-i18n";
</script>

<h2>{$_("home.none.header")}</h2>
<p>{$_("home.none.info")}</p>
<CreateHomeButton />

<style>
  p {
    margin-bottom: 1em;
  }
</style>
