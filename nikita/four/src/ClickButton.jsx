import { useState } from 'react'

function ClickButton({ label, count, onClick }) {
  return (
    <button onClick={onClick}>
      {label}: {count}
    </button>
  )
}

export default ClickButton
