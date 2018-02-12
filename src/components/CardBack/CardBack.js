import React from 'react'

import './CardBack.css'

const CardBack = ({ backImage }) => (
  <div
    className="back"
    style={{ backgroundImage: `url(${backImage})` }}
  ></div>
)

export default CardBack