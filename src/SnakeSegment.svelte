<script>
  export let x, y, head;
</script>

<style>
  div {
    background-color: #f88;
  }
  .head {
    background-color: #fcc;
  }
</style>

<div
  style="grid-row: {y+1}; grid-column: {x+1}"
  class:head={head}
 />
