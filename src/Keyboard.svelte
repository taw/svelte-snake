<script>
  export let keysChanged
  let keys = {}

  function handleKeydown(event) {
    keys[event.key] = true
    keysChanged(keys)
  }

  function handleKeyup(event) {
    keys[event.key] = false
    keysChanged(keys)
  }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>
