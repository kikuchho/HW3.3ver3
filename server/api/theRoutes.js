import fs from 'fs'
import Express from 'express'

import queryDatabase from '../data/mongoController.js'

// Create a new router (collection of routes)
const dataRouter = new Express.Router()

// Read in all games (put the data file under this directly otherwise it won't work)
// const rawJSON = fs.readFileSync('./server/games.json', { encoding: 'utf-8' })
// const allGames = JSON.parse(rawJSON)

// Setup the json body parser
dataRouter.use(Express.json())

try {
  queryDatabase(async db => {
    const data = await db.collection('movies').find({}).toArray()
    console.log('games retireved:', data.length)
  }, 'MyFlix2023')
} catch (err) {
  console.error('Failed to connect')
  console.error(err)
}

// Get all summarized games
dataRouter.get('/games', (req, res) => {
  queryDatabase(async db => {
    const data = await db.collection('movies').find({}).project(
      { _id: 0, id: 1, name: 1, yearPublished: 1, weight: 1, rating: 1, image: 1 }
    ).toArray()
    res.json(data)
  }, 'MyFlix2023')
})

// Get full details for one movie
dataRouter.get('/game/:ID', (req, res) => {
  const gameID = parseInt(req.params.ID) // <-- CAUTION! Always a string!!

  // Find that game
  /*
  const matchedGame = allGames.find((game) => { return (game.id === gameID) })
  if (matchedGame) {
    res.json(matchedGame)
  } else {
    // Movie is not found
    res.status(404).json({ error: true, message: `ID ${gameID} not found` })
  }
  */

  queryDatabase(async db => {
    const data = await db.collection('movies').find({ id: gameID }).toArray()
    if (Array.isArray(data) && data.length > 0) {
      res.json(data[0])
    } else {
      // Movie is not found
      res.status(404).json({ error: true, message: `game ID ${gameID} not found` })
    }
  }, 'MyFlix2023')
})

dataRouter.delete('/game/:ID', (req, res) => {
  const gameID = parseInt(req.params.ID) // <-- CAUTION! Always a string!!

  // Find that game
  /*
  const matchedIndex = allGames.findIndex((game) => { return (game.id === GameID) })
  if (matchedIndex >= 0) {
    // objective: delete the games

    // delete the game
    allGames.splice(matchedIndex, 1)

    // after deleting, upadate the array
    fs.writeFileSync('./server/games.json', JSON.stringify(allGames, null, 2), { encoding: 'utf-8' })

    res.json({ success: true })
  } else {
    // game is not found
    res.status(404).json({ error: true, message: `ID ${GameID} not found` })
  }
  */
  queryDatabase(async db => {
    const matchedIndex = await db.collection('movies').findIndex({ id: gameID }).toArray()
    if (matchedIndex >= 0) {
      // objective: delete the games
      const result = await db.collection('movies').deleteOne({ id: gameID })
      if (result.insertedId) {
        res.json({ success: true })
      }
    } else {
      // Movie is not found
      res.status(404).json({ error: true, message: `game ID ${gameID} not found` })
    }
  }, 'MyFlix2023')
})

dataRouter.put('/game', (req, res) => {
  // Retrieve the game object
  const theGame = req.body

  if (typeof theGame.id !== 'number' || !Number.isInteger(theGame.id) || typeof theGame.name !== 'string') {
    return res.status(400).json({ error: true, message: 'Missing or bad type for required data "id" or "name"' })
  }

  // Validate the game object
  // 1) Check that all required data is present
  // make sure it is not null, if null, set to each correct data type

  theGame.description = theGame.description ?? ''
  theGame.designers = theGame.designers ?? []
  theGame.artists = theGame.artists ?? [] // should i change it to {}?
  theGame.publishers = theGame.publishers ?? []
  theGame.minPlayers = theGame.minPlayers ?? 0
  theGame.maxPlayers = theGame.maxPlayers ?? 0
  theGame.playingTime = theGame.playingTime ?? 0
  theGame.minPlayTime = theGame.minPlayTime ?? 0
  theGame.maxPlayTime = theGame.maxPlayTime ?? 0
  theGame.minAge = theGame.minAge ?? 0
  theGame.weight = theGame.weight ?? 0
  theGame.rating = theGame.rating ?? 0

  // 2) Check that all data types are correct (watch out for NULLS) the ?? is :if the left is null, change it to the right
  if (typeof theGame.description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description is the wrong data type' })
  }
  if (!Array.isArray(theGame.designers)) {
    return res.status(400).json({ error: true, message: 'desginers is the wrong data type' })
  }
  if (!Array.isArray(theGame.artists)) {
    return res.status(400).json({ error: true, message: 'artists is the wrong data type' })
  }
  if (!Array.isArray(theGame.publishers)) {
    return res.status(400).json({ error: true, message: 'publishers is the wrong data type' })
  }
  if (typeof theGame.minPlayers !== 'number') {
    return res.status(400).json({ error: true, message: 'minplayers is the wrong data type' })
  }
  if (typeof theGame.maxPlayers !== 'number') {
    return res.status(400).json({ error: true, message: 'maxplayers is the wrong data type' })
  }
  if (typeof theGame.playingTime !== 'number') {
    return res.status(400).json({ error: true, message: 'playingtime is the wrong data type' })
  }
  if (typeof theGame.minPlayTime !== 'number') {
    return res.status(400).json({ error: true, message: 'minplaytime is the wrong data type' })
  }
  if (typeof theGame.maxPlayTime !== 'number') {
    return res.status(400).json({ error: true, message: 'maxplaytime is the wrong data type' })
  }
  if (typeof theGame.minAge !== 'number') {
    return res.status(400).json({ error: true, message: 'minage is the wrong data type' })
  }
  if (typeof theGame.weight !== 'number') {
    return res.status(400).json({ error: true, message: 'weight is the wrong data type' })
  }
  if (typeof theGame.rating !== 'number') {
    return res.status(400).json({ error: true, message: 'rating is the wrong data type' })
  }

  /*
  // insert the game
  allGames.push(theGame)
  // have to lock becasue it might be doing other writeitng
  // after inserting, upadate the array
  fs.writeFileSync('./server/games.json', JSON.stringify(allGames, null, 2), { encoding: 'utf-8' })
  // game insertion successefull
  res.json({ success: true, message: 'new game inserted' })
  */

  queryDatabase(async db => {
    // objective: insert  the games
    const result = await db.collection('movies').insertOne(theGame)
    if (result.insertedId) {
      res.json({ success: true, _id: result.insertedId })
    }

  }, 'MyFlix2023')
})

// Making the dataRouter available in other files
export default dataRouter
