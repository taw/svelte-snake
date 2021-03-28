<script>
  import SnakeSegment from "./SnakeSegment.svelte"

  export let snake
</script>

{#each snake as {x,y}, i}
  <SnakeSegment {x} {y} head={i == snake.length-1} />
{/each}
