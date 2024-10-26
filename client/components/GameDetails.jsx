import React from 'react'
import PropTypes from 'prop-types'

export default function GameDetails (props) {
  const { name, image, yearPublished, rating, minAge, playingTime, minPlayTime, maxPlayTime, minPlayers, maxPlayers, weight, publishers, designers, artists, description } = props
  return (
    <div className="container">
      <div className="row">
        <div className="col-5" style={{ marginBottom: '16px' }} >
          <img src={image} alt={`Full poster for ${name}`} style={{ maxWidth: '100%' }} />
        </div>
        <div className="col-7">
          <div className="row">
            <div className="col-3"><h4>{'Year:'}</h4></div>
            <div className="col-9">{yearPublished}</div>
            <div className="col-3"><h4>{'Rating:'}</h4></div>
            <div className="col-9">{rating}</div>
            <div className="col-3"><h4>{'minage:'}</h4></div>
            <div className="col-9">{minAge}</div>
            <div className="col-3"><h4>{'playing time:'}</h4></div>
            <div className="col-9">{playingTime}</div>
            <div className="col-3"><h4>{'minPlayTime:'}</h4></div>
            <div className="col-9">{minPlayTime}</div>
            <div className="col-3"><h4>{'maxPlayTime:'}</h4></div>
            <div className="col-9">{maxPlayTime}</div>
            <div className="col-3"><h4>{'minPlayers:'}</h4></div>
            <div className="col-9">{minPlayers}</div>
            <div className="col-3"><h4>{'maxPlayers:'}</h4></div>
            <div className="col-9">{maxPlayers}</div>
            <div className="col-3"><h4>{'weight:'}</h4></div>
            <div className="col-9">{weight}</div>
            <div className="col-3"><h4>{'publishers:'}</h4></div>
            <div className="col-9">{publishers.join(', ')}</div>
            <div className="col-3"><h4>{'designers:'}</h4></div>
            <div className="col-9">{designers.join(', ')}</div>
            <div className="col-3"><h4>{'artists:'}</h4></div>
            <div className="col-9">{artists.join(', ')}</div>
          </div>
        </div>
        <div className="col-12">{description}</div>
      </div>
    </div>
  )
}

GameDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  yearPublished: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  minAge: PropTypes.number.isRequired,
  playingTime: PropTypes.number.isRequired,
  minPlayTime: PropTypes.number.isRequired,
  maxPlayTime: PropTypes.number.isRequired,
  minPlayers: PropTypes.number.isRequired,
  maxPlayers: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  publishers: PropTypes.arrayOf(PropTypes.string),
  designers: PropTypes.arrayOf(PropTypes.string),
  artists: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string
}

GameDetails.defaultProps = {
  publishers: [],
  artists: [],
  designers: [],
  description: ''
}
