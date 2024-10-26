import React from 'react'
// import PropTypes from 'prop-types'

import FormInputComponent from './FormInputComponent.jsx'

import { insertTableTop } from '../dataHelper.js'
import GameGrid from './GameGrid.jsx'
import PropTypes from 'prop-types'

function stringListToArray (stringList) {
  const arrayValues = stringList.split(',')
  if (Array.isArray(arrayValues)) {
    return arrayValues.map(name => name.trim())
  }

  return [stringList]
}

export default function NewGameForm (props) {
// <input type="text" class="form-control" id="newGame-id" placeholder="00001">
  // '' in usestate('') is the default value for the usestate
  const [newGameId, setNewGameId] = React.useState('')
  const [newGameName, setNewGameName] = React.useState('')
  const [newGameDescription, setNewGameDescription] = React.useState('')
  const [newGameImage, setNewGameImage] = React.useState('')
  const [newGameYear, setNewGameYear] = React.useState(0)
  const [newGameRating, setNewGameRating] = React.useState(0.0)
  const [newGameArtists, setNewGameArtists] = React.useState('')
  const [newGamepublishers, setNewGamepublishers] = React.useState('')
  const [newGamedesigners, setNewGamedesigners] = React.useState('')

  const [newGameminAge, setNewGameminAge] = React.useState(0)
  const [newGameplayingTime, setNewGameplayingTime] = React.useState(0)
  const [newGamemaxPlayTime, setNewGamemaxPlayTime] = React.useState(0)
  // const [newGameminPlayTime, setNewGameminPlayTime] = React.useState(0)

  const [newGameminPlayers, setNewGameminPlayers] = React.useState(0)
  const [newGamemaxPlayers, setNewGamemaxPlayers] = React.useState(0)
  const [newGameminPlayTime, setNewGameminPlayTime] = React.useState(0)
  const [newGameweight, setNewGameweight] = React.useState(0.0)

  // this is for re rendering game grid, the game grid will rerender based on this value
  const { rerender ,statecahnge } = props

  const onSubmit = async (e) => {
    e.preventDefault()

    const Game = {
      id: newGameId,
      name: newGameName,
      yearPublished: newGameYear,
      description: newGameDescription,
      designers: stringListToArray(newGamedesigners),
      artists: stringListToArray(newGameArtists),
      publishers: stringListToArray(newGamepublishers),
      minPlayers: newGameminPlayers,
      maxPlayers: newGamemaxPlayers,
      playingTime: newGameplayingTime,
      minPlayTime: newGameminPlayTime,
      maxPlayTime: newGamemaxPlayTime,
      minAge: newGameminAge,
      weight: newGameweight,
      rating: newGameRating,
      image: newGameImage
    }

    // insert the game
    if (await insertTableTop(Game)) {
      window.alert('Game successfully inserted')
    } else {
      window.alert('Failed to insert game')
    }

    //request re render
    rerender()
  }

  return (
    <form className="addGameForm" onSubmit={onSubmit}>
      <div className="row">
        <FormInputComponent inputId='id' label='Game ID:' inputType='number' value={newGameId} onValueChanged={setNewGameId} />
        <FormInputComponent inputId='name' label='Game Name:' inputType='text' value={newGameName} onValueChanged={setNewGameName} />
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="inputElement-description" className="form-label">{'Description:'}</label>
          <textarea id="inputElement-description" rows={4} cols={40} className="form-control" value={newGameDescription} onChange={(e) => setNewGameDescription(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <FormInputComponent inputId='yearPublished' label='Year Released:' inputType='number' value={newGameYear} onValueChanged={setNewGameYear} />

        <div className="col">
          <FormInputComponent inputId='minAge' label='min age:' inputType='number' value={newGameminAge} onValueChanged={setNewGameminAge} />
        </div>

        <FormInputComponent inputId='rating' label='Rating:' inputType='number' isFloat value={newGameRating} onValueChanged={setNewGameRating} />
      </div>

      <div className="row">
        <div className="col">
          <FormInputComponent inputId='playingTime' label='playing time:' inputType='number' value={newGameplayingTime} onValueChanged={setNewGameplayingTime} />
        </div>

        <div className="col">
          <FormInputComponent inputId='minPlayTime' label='minPlay Time:' inputType='number' value={newGameminPlayTime} onValueChanged={setNewGameminPlayTime} />
        </div>

        <div className="col">
          <FormInputComponent inputId='maxPlayTime' label='maxPlay Time:' inputType='number' value={newGamemaxPlayTime} onValueChanged={setNewGamemaxPlayTime} />
        </div>

        <div className="col">
          <FormInputComponent inputId='minPlayers' label='min Players:' inputType='number' value={newGameminPlayers} onValueChanged={setNewGameminPlayers} />
        </div>

        <div className="col">
          <FormInputComponent inputId='maxPlayers' label='max Players:' inputType='number' value={newGamemaxPlayers} onValueChanged={setNewGamemaxPlayers} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <FormInputComponent inputId='weight' label='weight:' inputType='number' isFloat value={newGameweight} onValueChanged={setNewGameweight} />
        </div>

        <div className="col">
          <FormInputComponent inputId='publishers' label='publishers:' inputType='text' value={newGamepublishers} onValueChanged={setNewGamepublishers} />
        </div>

        <div className="col">
          <FormInputComponent inputId='designers' label='designers:' inputType='text' value={newGamedesigners} onValueChanged={setNewGamedesigners} />
        </div>

        <FormInputComponent inputId='artists' label='Artists:' inputType='text' value={newGameArtists} onValueChanged={setNewGameArtists} />

        <div className="col">
          <label htmlFor="newGame-image" className="form-label">{'Image URL:'}</label>
          <input type="text" className="form-control" id="newGame-image" placeholder="image.jpg" value={newGameImage} onChange={(e) => setNewGameImage(e.target.value)}/>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button type="submit" className="btn btn-primary">{'Submit'}</button>
        </div>
      </div>
    </form>
  )
}

 NewGameForm.propTypes = {
  // eslint-disable-next-line react/no-typos
  rerender: PropTypes.func
 }
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   yearPublished: PropTypes.number.isRequired,
//   rating: PropTypes.number.isRequired,
//   minAge: PropTypes.number.isRequired,
//   playingTime: PropTypes.number.isRequired,
//   minPlayTime: PropTypes.number.isRequired,
//   maxPlayTime: PropTypes.number.isRequired,
//   minPlayers: PropTypes.number.isRequired,
//   maxPlayers: PropTypes.number.isRequired,
//   weight: PropTypes.number.isRequired,
//   publishers: PropTypes.arrayOf(PropTypes.string),
//   designers: PropTypes.arrayOf(PropTypes.string),
//   artists: PropTypes.arrayOf(PropTypes.string),
//   description: PropTypes.string
// }

NewGameForm.defaultProps = {
  rerender: () => { }
}
//   publishers: [],
//   artists: [],
//   designers: [],
//   description: ''
// }
