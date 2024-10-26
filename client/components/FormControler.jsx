import React from 'react'
import PropTypes from 'prop-types'
import Form from './NewGameForm'
import { insertTableTop } from '../dataHelper'

export default function FormControler (props) {

// Some component state



const [addGameForm, setaddGameForm] = React.useState();

const [Game, setGames] = React.useState('')

// TODO: rerender the grid everytime new game inserted, insert the game to the array
React.useEffect(() => {
  // Escape Hatch!  We have escaped the rules
  // of pure functions
  const fetchData = async () => {

    const gameData = await insertTableTop()
    setGames(gameData)

    // insert the game
    if (await insertTableTop(Game)) {
      window.alert('Game successfully inserted')
    } else {
      window.alert('Failed to insert game')
    }
  }

  fetchData()
}, [])


}
