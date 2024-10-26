import React from 'react'
import PropTypes from 'prop-types'

export default function FormInputComponent (props) {
  const { label, inputId, inputType, isFloat, value, onValueChanged } = props

  const handleChange = (e) => {
    if (inputType === 'number') {
      if (isFloat) {
        onValueChanged(parseFloat(e.target.value) || 0)
      } else {
        onValueChanged(parseInt(e.target.value) || 0)
      }
    } else {
      onValueChanged(e.target.value)
    }
  }

  return (
    <div className="col">
      <label htmlFor={`inputElement-${inputId}`} className="form-label">{label}</label>
      <input id={`inputElement-${inputId}`} type={inputType} step={isFloat ? 0.01 : 1} className="form-control" value={value} onChange={handleChange} />
    </div>
  )
}

FormInputComponent.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  isFloat: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onValueChanged: PropTypes.func.isRequired
}

FormInputComponent.defaultProps = {
  label: 'Label:',
  isFloat: false,
  inputType: 'text'
}
