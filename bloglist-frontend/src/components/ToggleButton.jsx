import { useState, useImperativeHandle  } from 'react'

const ToggleButton = props => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => { toggleVisibility(); props.setIsActive(true) }}>{props.buttonLabel1}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => { toggleVisibility(); props.setIsActive(false) }}>{props.buttonLabel2}</button>
      </div>
    </div>
  )
}

export default ToggleButton