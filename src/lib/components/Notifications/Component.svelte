<script lang="ts">
  import { ToastNotification } from "carbon-components-svelte";
  import { fly } from "svelte/transition";
  import { dismiss, notifications } from "./store";
</script>

<div class="notifications">
  {#each $notifications as { id, ...notification } (id)}
    <div transition:fly={{ x: -20 }}>
      <ToastNotification {...notification} on:close={() => dismiss(id)} />
    </div>
  {/each}
</div>

<style>
  .notifications {
    position: fixed;
    left: 20px;
    bottom: 10px;
    z-index: 2;
  }
</style>
