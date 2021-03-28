<script>
  export let x, y, icon;
</script>

<style>
  div {
    font-size: 30px;
    background-color: #cfc;
    text-align: center;
  }
</style>

<div style="grid-row: {y+1}; grid-column: {x+1}">
  {icon}
</div>
