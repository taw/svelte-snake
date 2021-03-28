<script>
  import Food from "./Food.svelte"
  import GridBoxes from "./GridBoxes.svelte"
  import Snake from "./Snake.svelte"
  import Keyboard from "./Keyboard.svelte"
  import {randInt, randomElement} from "./random.js"

  let foodIcons = [
    "🍧",
    "🍩",
    "🍪",
    "🍫",
    "🥐",
    "🧁",
    "🥞",
    "🍰",
    "🎂",
    "🍭",
    "🍧",
    "🥧",
    "🥮",
    "🍬",
    "🍦",
  ]

  function makeFood() {
    while(1) {
      let x = randInt(0, 19)
      let y = randInt(0, 19)
      let icon = randomElement(foodIcons)
      if (findFoodIndex(x, y) !== null) {
        continue
      }
      if (isSnakeOverlap(x, y)) {
        continue
      }
      return {x,y,icon}
    }
  }

  function findFoodIndex(x, y) {
    for (let i=0; i<foods.length; i++) {
      let f = foods[i]
      if (x === f.x && y === f.y) {
        return f
      }
    }
    return null
  }

  function isSnakeOverlap(x, y) {
    for (let s of snake) {
      if (x === s.x && y === s.y) {
        return true
      }
    }
    return false
  }

  function makeFoods(count) {
    for (let i=0; i<count; i++) {
      foods = [...foods, makeFood()]
    }
  }

  function changeDirection() {
    if (dir === "down" || dir === "up") {
      if (keys.ArrowLeft) {
        dir = "left"
      }
      if (keys.ArrowRight) {
        dir = "right"
      }
    } else if (dir === "left" || dir === "right") {
      if (keys.ArrowUp) {
        dir = "up"
      }
      if (keys.ArrowDown) {
        dir = "down"
      }
    }
    if (dir === "up") {
      dx = 0
      dy = -1
    }
    if (dir === "down") {
      dx = 0
      dy = 1
    }
    if (dir === "left") {
      dx = -1
      dy = 0
    }
    if (dir === "right") {
      dx = 1
      dy = 0
    }
  }

  function moveSnake() {
    if (!active) { return }
    changeDirection()
    let {x,y} = snake[snake.length-1]
    x = (x + dx + 20) % 20
    y = (y + dy + 20) % 20

    if (isSnakeOverlap(x, y)) {
      active = false
      return
    }

    snake = [...snake, {x,y}]

    let i = findFoodIndex(x, y)
    if (i === null) {
      snake.shift()
    } else {
      score += 1
      foods.splice(i, 1)
      foods = [...foods, makeFood()]
      coinSound.play()
    }
  }

  setInterval(moveSnake, 200)

  let coinSound
  let score = 0
  let foods = []
  let snake = [
    {x: 5, y: 5},
    {x: 5, y: 6},
    {x: 5, y: 7},
  ]
  let active=true
  let dir='down'
  let dx=0
  let dy=1
  let keys={}

  makeFoods(20)
</script>

<style>
header {
  font-size: 400%;
}
.grid {
  border: 1px solid #666;
  display: grid;
  margin: auto;
  width: 800px;
  height: 800px;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
}
</style>

<header>Score: {score}</header>

<div class="grid">
  <GridBoxes />

  {#each foods as {x,y,icon}}
    <Food {x} {y} {icon} />
  {/each}

  <Snake {snake} />
</div>

<Keyboard keysChanged={k => keys=k} />

<audio src="./audio/coin4.mp3" preload=auto bind:this={coinSound} />
