import React from 'react'
import classNames from 'classnames'

import './CardItem.css'
import CardFront from '../CardFront/CardFront'
import CardBack from '../CardBack/CardBack'

const CardItem = ({
  id,
  name,
  backImage,
  selected,
  match,
  onFrontClick
}) => (
  <div
    className={
      classNames({
        card: true,
        selected: selected,
        match: match
      })
    }
    data-name={name}
  >
    <CardFront id={id} onFrontClick={onFrontClick} />
    <CardBack backImage={backImage} />
  </div>
)

export default CardItem