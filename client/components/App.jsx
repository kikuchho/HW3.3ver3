import React from 'react'

import PageHeader from './PageHeader.jsx'

import GameGrid from './GameGrid.jsx'
import BootstrapModal from './BootstrapModal.jsx'
import GameDetails from './GameDetails.jsx'
import NewGameForm from './NewGameForm.jsx'

import { retrieveTableTopDetails } from '../dataHelper.js'

export default function App (props) {
  // Do anything I want here as long as I am PURE

  // Track movie ID state (the most recently clicked movie)
  const [currentGameId, setCurrentGameId] = React.useState('')

  // Track modal state
  const [showDetailsModal, setShowDetailsModal] = React.useState(false)

  const detailsRequested = (GameId) => {
    // Save the ID of the movie
    setCurrentGameId(GameId)

    // Show the details modal
    setShowDetailsModal(true)
  }

  // everytime the value changed this get called automaticully
  // when the form submitted , send rerender request to newgameform
  const [requestsent, setrequestsent ] = React.useState(false)
  const [rerender ,setrerender] = React.useState(false)
  const renderrequsted  = () => {
    //send request to gamegrid
      setrequestsent(true)
    //flip the value to false
      setrerender(! rerender )
      //setrequestsent(false)
  }


  // When the Game ID changes, retrieve the details
  const [currentGameData, setCurrentGameData] = React.useState(null)
  React.useEffect(() => {
    // Retrieve movie details and update in state
    const fetchDetails = async () => {
      const GameData = await retrieveTableTopDetails(currentGameId)
      setCurrentGameData(GameData)
    }

    // When the ID is valid, retrieve the details
    if (currentGameId !== '') {
      fetchDetails(currentGameId)
    }
  }, [currentGameId])
  // line 48 , the game card have props ondetailrequested
  return (
    <div className='container'>
      <PageHeader title='my Game Browser' subTitle='Click on a Game below for more information.' />
      <NewGameForm rerender={renderrequsted} />
      <GameGrid onDetailsRequested={detailsRequested} rerenderrequst={requestsent} />
      <BootstrapModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
         // ?. is  optional chaninig if null, ignore it
        name={`${currentGameData?.name} (${currentGameData?.id})`}
      >
        {!!currentGameData && <GameDetails {...currentGameData} />}

      </BootstrapModal>
    </div>
  )// line 52. taking advamgae of AND operator, it doesn't execute the right(spread currrentgamedata) if currentgamedata is not defined
}
