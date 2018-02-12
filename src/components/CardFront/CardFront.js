import React from 'react'

import './CardFront.css'

const CardFront = ({ id, onFrontClick }) => (
  <div
    className="front"
    onClick={(e) => onFrontClick(id)}
  ></div>
)

export default CardFront