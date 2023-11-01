<script lang="ts">
  import HomeTowels from "./HomeTowels.svelte";

  export let data;

  $: ({
    home,
    towels,
    session: { user },
  } = data);
</script>

<HomeTowels {home} {towels} userId={user.id} />
