import React, { useEffect } from 'react'

import { retrieveTableTop } from '../dataHelper.js'

import GameCard from './GameCard.jsx'

import PropTypes from 'prop-types'

export default function GameGrid (props) {
  // Some component state
  const [games, setGames] = React.useState([])

  const { rerenderrequest } = props

  React.useEffect(() => {
    //re render
    const gameCards = games.map(
        game => <GameCard {...game} {...props} key={game.id} />
      )
    return (

      <div className='row'>
        {gameCards}
      </div>
    )
  }, [rerenderrequest])

  // TODO: Fetch the array of games
  // Give it a dangerous function (with side-effects)
  // To be run later!
  React.useEffect(() => {
    // Escape Hatch!  We have escaped the rules
    // of pure functions
    const fetchData = async () => {
      const gameData = await retrieveTableTop()

      // CAN call state mutators
      setGames(gameData)
    }

    fetchData()
  }, [])
  // Function with "undefined" dependencies => run EVERY render
  // Function with empty array of dependencies => run once
  // Function with non-empty array of dependencies => runs when those change




  // Convert games to gameCard Components
  const gameCards = games.map(
    game => <GameCard {...game} {...props} key={game.id} />
  )

  // Render the game Cards
  return (
    <div className='row'>
      {gameCards}
    </div>
  )
}

GameGrid.propTypes = {
  rerenderrequest: PropTypes.bool
}

GameGrid.defaultProps = {
  rerenderrequest: false
}
