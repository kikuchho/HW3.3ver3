// Import our data helper functions
import { retrieveTableTopDetails, retrieveTableTop, insertTableTop, deleteTableTop } from './dataHelper.js'

// import * as DataHelper form '...'
// DataHelper.retrieveGames()

import 'bootstrap-icons/font/bootstrap-icons.css' // we installed bootstrap icon so make sure to import it here, when this is installed bundler don't know what to do, so in the package json we used loader to tell what to do with that url
import 'bootstrap/dist/css/bootstrap.min.css' // only work when using bundler
import { Modal } from 'bootstrap'

const movieDetailsModal = new Modal('#detailsModal')

// Initialize the modal object
// const movieDetailsModal = new bootstrap.Modal('#detailsModal')

// All the new game fields
const GAME_FIELDS = [
  { name: 'id', type: 'integer' },
  { name: 'name', type: 'string' },
  { name: 'yearPublished', type: 'integer' },
  { name: 'description', type: 'string' },
  { name: 'minAge', type: 'integer' },
  { name: 'rating', type: 'double' },
  { name: 'playingTime', type: 'integer' },
  { name: 'minPlayTime', type: 'integer' },
  { name: 'maxPlayTime', type: 'integer' },
  { name: 'minPlayers', type: 'integer' },
  { name: 'maxPlayers', type: 'integer' },
  { name: 'weight', type: 'double' },
  { name: 'image', type: 'string' },
  { name: 'publishers', type: 'stringArray' },
  { name: 'designers', type: 'stringArray' },
  { name: 'artists', type: 'stringArray' }
]

// Initialize submit event for the form
const formElement = document.getElementById('addGameForm') // the form is in the index.html
formElement.addEventListener('submit', async (event) => {
  // Prevent default behavior
  event.preventDefault()

  // Build a new game object
  const newGame = {}
  GAME_FIELDS.forEach(field => {
    newGame[field.name] = document.getElementById(`newGame-${field.name}`).value
    if (field.type === 'integer') {
      newGame[field.name] = parseInt(newGame[field.name]) || 0
    } else if (field.type === 'double') {
      newGame[field.name] = parseFloat(newGame[field.name]) || 0
    } else if (field.type === 'stringArray') {
      if (newGame[field.name].includes(',')) {
        newGame[field.name] = newGame[field.name].split(',') // if it has comma, separate and put it into array
      } else {
        newGame[field.name] = [newGame[field.name]] // if it is just one, change it into array
      }
    }
  })

  if (await insertTableTop(newGame)) {
    window.alert('Game successfully inserted')
    renderGameGrid()
  } else {
    window.alert('Failed to insert game')
  }
})

/**
 * Render the grid of game cards into the page
 */
async function renderGameGrid () {
  const TableTopData = await retrieveTableTop()
  rebuildTableGridFromData(TableTopData)
}

async function showTableTopDetails (ID) {
  // get the game details
  const theDetails = await retrieveTableTopDetails(ID)
  console.log(theDetails)

  // Fill in the content , this is not for loop, it moves over keys(id,description etc)
  for (const key in theDetails) {
    const element = document.getElementById(`details-${key}`)
    if (element) {
      if (key === 'image') {
        // Handle image differently
        // element.setAttribute('src', `posters/${theDetails[key]}`)
        element.setAttribute('src', `${theDetails[key]}`)
        element.setAttribute('alt', `Full poster for ${theDetails.name}`)
      } else {
        // Others, copy in details
        element.textContent = theDetails[key]
      }
    }
  }
  // modal is used here, what is going to be displayed is defiend in index.html
  // Show the modal (with details filled in)
  movieDetailsModal.show()
}

/**
 * Use the given data array to rebuild the game grid
 * @param {Object[]} TableTopData Array of objects from the database
 */
function rebuildTableGridFromData (TableTopData) {
  // Get reference to the game grid
  const gameGrid = document.querySelector('#gameGrid')

  while (gameGrid.lastChild) {
    gameGrid.removeChild(gameGrid.lastChild)
  }

  // Loop over the games
  TableTopData.forEach((TableTop) => {
    // Manually make the outermost div
    const gameCard = document.createElement('div')
    gameCard.className = 'col-sm-6 col-md-4 col-lg-3'

    // Set it's innerHTML (this is cheating but it's okay for now)
    gameCard.innerHTML = `
      <div class='gameSummary'>            
        <span class='summaryTitle'>${TableTop.name}</span>
        <img alt='Poster for ${TableTop.name}' src='${TableTop.image}' style='object-fit: contain; max-width: 100%;' />
        <br>
        <span class='summaryInfo'>
            ${TableTop.yearPublished} / ${TableTop.publishers.slice(0, 3).join(', ')} / ${TableTop.rating} / ${TableTop.weight}
        </span>
        <button type="button" class="btn btn-warning innerDeleteButton">
          <i class="bi-trash3"></i>
        </button>
      </div>
    `

    gameCard.addEventListener('click', (event) => {
      event.preventDefault()
      showTableTopDetails(TableTop.id)
    })

    // want to do something like this
    const buttonDelete = gameCard.querySelector('.innerDeleteButton') // the '.' mean class, queryselector search anything with that name in the html
    buttonDelete.addEventListener('click', async (event) => {
      event.preventDefault()
      event.stopPropagation() // without this, if you click it, it also trigger the event above
      console.log('Delete entry', TableTop.id)
      // TODO: Delete the game here
      if (confirm('Are you sure you want to delete?')) {
        if (await deleteTableTop(TableTop.id)) {
          window.alert('Game successfully deleted')
          // TODO: Rebuild the game grid
          renderGameGrid()
        } else {
          window.alert('Failed to delete game')
        }
      }
    })

    // Append this to the game grid as a child element
    gameGrid.appendChild(gameCard)
  })
}

// Kick-start the game grid rendering process
renderGameGrid()
