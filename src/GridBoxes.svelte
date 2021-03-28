<script>
  import Box from "./Box.svelte";
</script>

{#each {length: 20} as _, x}
  {#each {length: 20} as _, y}
    <Box {x} {y} />
  {/each}
{/each}
