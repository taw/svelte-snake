<script>
  export let x, y;
</script>

<style>
  div {
    background-color: #ddd;
  }
  .odd {
    background-color: #aaa;
  }
</style>

<div
  style="grid-row: {y+1}; grid-column: {x+1}"
  class:odd={(x+y) % 2 == 1}
 />
