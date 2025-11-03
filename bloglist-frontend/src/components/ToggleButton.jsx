import { useState, useImperativeHandle } from "react";

// const ToggleButton = ({ buttonLabel1, buttonLabel2, ref, isVisible, handleVisible, children }) => {
const ToggleButton = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const getVisiblilty = () => {
    return visible;
  };

  const onClick = () => {
    toggleVisibility();
    props.handleVisible();
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => onClick()}>{props.buttonLabel1}</button>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel1}</button> */}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {console.log(props.handleVisible)}
        <button onClick={() => onClick()}>{props.buttonLabel2}</button>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel2}</button> */}
      </div>
    </div>
  );
};

export default ToggleButton;
