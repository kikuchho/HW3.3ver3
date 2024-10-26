import React from 'react'
import PropTypes from 'prop-types'

const gameSummaryStyle = {
  border: 'solid 1px lightgrey',
  borderRadius: '10px',
  boxShadow: 'lightgrey 3px 3px 6px',
  transition: 'box-shadow 0.3s ease-in-out',
  textAlign: 'center',
  padding: '5px',
  marginBottom: '15px',
  verticalAlign: 'bottom',
  cursor: 'pointer'
}

const summaryTitleStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '4.5em'
}

const summaryInfoStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '7em'
}

export default function GameCard (props) {
  const { id, name, yearPublished, rating, publishers, image, onDetailsRequested } = props

  const handleClick = (event) => {
    event.preventDefault()
    // User has requested details
    onDetailsRequested(id)
  }

  return (
    <div className='col-sm-6 col-md-4 col-lg-3' onClick={handleClick}>
      <div style={gameSummaryStyle}>
        <span style={summaryTitleStyle}>{name}</span>
        <img
          alt={`Poster for ${name}`}
          src={image}
          style={{ maxWidth: '100%', objectFit: 'contain' }}
        />
        <br />
        <span style={summaryInfoStyle}>
          {publishers.slice(0, 3).join(', ')}
          <br />
          {`${yearPublished}, ${rating.toFixed(2)}`}
        </span>
      </div>
    </div>
  )
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  yearPublished: PropTypes.number.isRequired,
  rating: PropTypes.number,
  publishers: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  onDetailsRequested: PropTypes.func
}

GameCard.defaultProps = {
  publishers: [],
  image: 'missing.png',
  onDetailsRequested: () => { },
  rating: -1
}
