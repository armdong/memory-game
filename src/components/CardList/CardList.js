import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

import './CardList.css'
import CardItem from '../CardItem/CardItem'
import img_1up from '../../assets/1up.png'
import img_blueshell from '../../assets/blueshell.png'
import img_bobomb from '../../assets/bobomb.png'
import img_bulletbill from '../../assets/bulletbill.png'
import img_coin from '../../assets/coin.png'
import img_goomba from '../../assets/goomba.png'
import img_luigi from '../../assets/luigi.png'
import img_mario from '../../assets/mario.png'
import img_mushroom from '../../assets/mushroom.png'
import img_peach from '../../assets/peach.png'
import img_star from '../../assets/star.png'
import img_thwomp from '../../assets/thwomp.png'

let cards = [
  { name: '1up', img: img_1up },
  { name: 'blueshell', img: img_blueshell },
  { name: 'bobomb', img: img_bobomb },
  { name: 'bulletbill', img: img_bulletbill },
  { name: 'coin', img: img_coin },
  { name: 'goomba', img: img_goomba },
  { name: 'luigi', img: img_luigi },
  { name: 'mario', img: img_mario },
  { name: 'mushroom', img: img_mushroom },
  { name: 'peach', img: img_peach },
  { name: 'star', img: img_star },
  { name: 'thwomp', img: img_thwomp }
]

cards = [...cards, ...cards]
  .sort(() => 0.5 - Math.random())
  .map(card => ({
    id: uuidv4(),
    name: card.name,
    img: card.img,
    selected: false
  }))

class CardList extends Component {
  state = {
    cards: cards,
    count: 0,
    delay: 1200,
    previousGuess: null
  }

  handleFrontClick = (id) => {
    const {
      count,
      delay,
      previousGuess
    } = this.state

    // click the same card as before
    if (previousGuess === id || count == 2) {
      return false
    }

    // first guess
    if (count === 0) {
      this.setState({
        count: 1,
        previousGuess: id
      })
    } else if(count === 1) {
      this.setState({
        count: 2
      })
    }

    this.setState(prevState => ({
      cards: [...prevState.cards].map(card => card.id === id ? {...card, selected: true} : card)
    }), () => {

      // callback after set the card as selected
      const { count } = this.state

      // if first selected, break
      if (count === 1) {
        return false
      }

      // verify current taget has the same name as previous or not
      const prevCard = cards.find(card => card.id === previousGuess)
      const currentCard = cards.find(card => card.id === id)

      if (prevCard.name === currentCard.name) {

        // Aha! you got it, set the selected cards as match and remove the selected state
        setTimeout(() => {
          this.setState(prevState => ({
            cards: [...prevState.cards].map(card =>
              (card.id === prevCard.id || card.id === currentCard.id)
                ? {...card, match: true, selected: false}
                : card
            ),
            count: 0,
            previousGuess: null
          }))
        }, delay)

      } else {

        // Sorry, you are not catch it, bring the initial state back
        setTimeout(() => {
          this.setState(prevState => ({
            cards: [...prevState.cards].map(card =>
              (card.id === prevCard.id || card.id === currentCard.id)
                ? {...card, selected: false}
                : card
            ),
            count: 0,
            previousGuess: null
          }))
        }, delay)
      }
    })
  }

  render () {
    const { cards } = this.state

    return (
      <section className="grid">
        {cards.map(card => (
          <CardItem
            key={card.id}
            id={card.id}
            name={card.name}
            backImage={card.img}
            selected={card.selected}
            match={card.match}
            onFrontClick={this.handleFrontClick}
          />
        ))}
      </section>
    )
  }
}

export default CardList