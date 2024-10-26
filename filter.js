import fs from 'fs'

// Read in all games (put the data file under this directly otherwise it won't work)
const rawJSON = fs.readFileSync('./server/games.json', { encoding: 'utf-8' })
const allGames = JSON.parse(rawJSON)

const reduced = allGames.reduce((accum, currentGame) => {
  const foundIndex = accum.findIndex(prev => prev.id === currentGame.id)
  if (foundIndex >= 0) { return accum }
  return [...accum, currentGame]
}, [])

fs.writeFileSync('./server/games.json', JSON.stringify(reduced, null, 2), { encoding: 'utf-8' })
