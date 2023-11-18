<script context="module" lang="ts">
</script>

<script lang="ts">
  import { Duration } from "luxon";
  import { _ } from "svelte-i18n";

  export let usedSince: Date;

  const WARN_THRESHOLD = 4;
  const DANGER_THRESHOLD = 7;

  $: days = Math.floor(
    Duration.fromMillis(Date.now() - usedSince.getTime()).as("days")
  );
  $: fresh = days === 0;
  $: danger = days >= DANGER_THRESHOLD;
  $: warn = !danger && days >= WARN_THRESHOLD;
</script>

<div class:warn class:danger class:fresh>
  {$_("towel.age", { values: { days } })}
</div>

<style>
  .fresh {
    color: "focus";
  }
  .warn {
    color: #e57f19;
  }
  .danger {
    color: "danger-02";
  }
</style>
