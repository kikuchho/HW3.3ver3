/**
 * Asynchronously retrieve the moveis from our data endpoint and return them as an array
 * @returns {Promise} Resolves to an array of movies on success or an empty array on failure
 */
export async function retrieveTableTop () {
  try {
    // Send an AJAX request to our get.php endpoint
    const response = await fetch('data/games')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }

    // Parse the response from JSON into an object and return it
    return await response.json()
  } catch (err) {
    // something went wrong so return an empty array
    console.error('Failed to retrieve array of games')
    console.error(err)
    return []
  }
}

/**
 * Asynchronously retrieve the details for one movie from our data endpoint and return them
 * @returns {Promise} Resolves to an object for that movie on success or null on failure
 */
export async function retrieveTableTopDetails (ID) {
  try {
    // Send an AJAX request to get.php endpoint
    const response = await fetch(`data/game/${ID}`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }

    // Parse the response from JSON into an object and return it
    return await response.json()
  } catch (err) {
    // something went wrong so return null
    console.error('Failed to retrieve details')
    console.error(err)
    return null
  }
}

export async function insertTableTop (gameObj) {
  try {
    // Send an request to route endpoint
    const response = await fetch('data/game', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameObj)
    })

    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    // something went wrong so return null
    console.error('Failed to insert game')
    console.error(err)
    return false
  }
}

export async function deleteTableTop (gameId) {
  try {
  // Send an request to route endpoint
    const response = await fetch(`data/game/${gameId}`, {
      method: 'DELETE'
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
  // something went wrong so return null
    console.error('Failed to delete game')
    console.error(err)
    return false
  }
}
