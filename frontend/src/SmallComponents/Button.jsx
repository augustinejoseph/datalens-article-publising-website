import React from 'react'
import "./Button.css"

const Button = (props) => {
    const {style, data } = props;
  return (
    <div style={style}>
        <span> {data?.data} </span> </div>
  )
}

export default Button