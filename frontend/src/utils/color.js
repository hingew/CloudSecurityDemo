const colorOptions = [
  'red',
  'blue',
  'green',
  'teal'
]

function random () {
  const idx = Math.floor(Math.random() * colorOptions.length)
  return colorOptions[idx]
}

const colors = {
  random: random
}

export default colors
