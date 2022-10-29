import React from 'react'
import './index.css'

function Adjustment({index, title, value, onChange, min, max}) {

    const AdjustValue = (e) => {
    onChange(index, e.target.value)
    }

  return (
    <div className='Adjustment'>
        <div className="Adjustment_title">{title}</div>
        <input type="range" min={min} max={max} value={value} onChange={AdjustValue} />
    </div>
  )
}

export default Adjustment