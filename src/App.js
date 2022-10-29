import './App.css';
import { useState, useRef } from 'react';
import Adjustment from './components/Adjustment';
import ImageHolder from './components/ImageHolder';
import {DEFAULT_OPTIONS} from './helper'

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS)

  const childRef = useRef(null);

  function ImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return { filter: filters.join(' ') }
  }

  function handleAdjustmentChange(index, value) {
    setOptions(prevOptions => {
      return prevOptions.map((option, i) => {
        if (i !== index) return option
        return { ...option, value: value }
      })
    })
  }

  const handleReset = () => {
    setOptions(DEFAULT_OPTIONS)
  }

  const handleSave = () => {
    childRef.current.Save();
  };
  
  return (
    <>
    <div className='header'>
      IMAGE EDITOR
    </div>
    <div className="Editor">
      <ImageHolder style={ImageStyle()} ref={childRef}/>
      <div className='Controls'>
        <div className='Adjustments'>
          {
            options.map((option, index) => (
              <Adjustment
                key={index}
                index= {index}
                title={option.name}
                value={option.value}
                min={option.range.min}
                max={option.range.max}
                onChange={handleAdjustmentChange}
              />
            ))
          }
      </div>
      <div className='buttons'>
        <button className='reset' onClick={handleReset}>Reset</button>
        <button className='save' onClick={handleSave}>Save</button>    
      </div>
      </div>
    </div>
    <div className='footer'>
      Created with ❤️ by <a href="https://github.com/rahulps1000">Rahul</a>
    </div>
    </>
  );
}

export default App;
