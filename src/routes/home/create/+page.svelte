<script lang="ts">
  import { Button, Form, FormGroup, TextInput } from "carbon-components-svelte";
  import { _ } from "svelte-i18n";
</script>

<h2>{$_("home.create_home")}</h2>
<Form method="POST">
  <FormGroup>
    <TextInput labelText={$_("home.name")} name="name" minlength={4} />
  </FormGroup>
  <Button type="submit">{$_("home.create")}</Button>
</Form>

<style>
  h2 {
    margin-bottom: 0.6em;
  }
</style>
