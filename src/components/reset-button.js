import React from 'react'

const ResetButton = ({
  children
}) => {
  return (
    <button
      className="button is-danger"
      style={{ position: 'fixed', bottom: '0', right: '0', margin: '15px' }}
      onClick={resetToDefaults}>
      {children}
    </button>
  )
}

const resetToDefaults = () => {
  localStorage.removeItem('todo-app')
  window.location.reload()
}

export default ResetButton
