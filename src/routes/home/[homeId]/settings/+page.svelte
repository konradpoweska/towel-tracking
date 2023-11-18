<script lang="ts">
  import LeaveOrDeleteHomeButton from "./LeaveOrDeleteHomeButton.svelte";
  import Members from "./Members.svelte";
  import Towels from "./Towels.svelte";

  export let data;
  $: ({ home, towels, inviteLink } = data);
  const userId = data.session.user.id;
</script>

<div class="header">
  <h1>{home.name}</h1>
</div>
<div class="sections">
  <Members {home} {inviteLink} {userId} />
  <Towels {home} {towels} />
  <LeaveOrDeleteHomeButton {home} />
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    column-gap: 20px;
    margin-bottom: 20px;
  }
  .sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
