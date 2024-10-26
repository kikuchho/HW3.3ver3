import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'bootstrap'

export default function BootstrapModal (props) {
  // use props to bring data defined in other file
  const { name, open, onClose, children } = props

  // Initialize the modal object
  const modalRef = React.useRef() // Attach to an element
  const [modalObj, setModalObj] = React.useState(null)
  React.useEffect(() => {
    if (modalRef.current && !modalObj) {
      const gameDetailsModal = new Modal(modalRef.current)
      modalRef.current.addEventListener('hidden.bs.modal', event => {
        onClose()
      })
      setModalObj(gameDetailsModal)
    }
  }, [modalObj, onClose])

  // Open the modal when the open prop changes
  // ? mean: do this only if it's defined
  React.useEffect(() => {
    if (modalObj) {
      if (open) {
        modalObj?.show()
      } else {
        modalObj.hide()
      }
    }
  }, [open, modalObj])

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {name}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>{'Close'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

BootstrapModal.propTypes = {
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}

BootstrapModal.defaultProps = {
  name: 'Title',
  children: null
}
