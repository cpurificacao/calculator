import React from 'react';
import './Button.css';

export default function Button(props) {
  let classes = 'button ';

  if (props.double) classes += 'double';
  if (props.triple) classes += 'triple';
  if (props.operation) classes += 'operation';
  
  return (
    <button
      className={classes}
      onClick={() => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  );
}