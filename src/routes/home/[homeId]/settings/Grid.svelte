<div class={`grid ${$$restProps.class ?? ""}`}>
  <slot />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 6px;
  }
  @media screen and (min-width: 800px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (min-width: 1100px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media screen and (min-width: 1500px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>
