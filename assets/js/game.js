let count = 0
let firstGuess = ''
let secondGuess = ''
let previousTarget = null
let delay = 1200

// Cards
const cards = [
  { name: '1up', img: 'assets/img/1up.png' },
  { name: 'blueshell', img: 'assets/img/blueshell.png' },
  { name: 'bobomb', img: 'assets/img/bobomb.png' },
  { name: 'bulletbill', img: 'assets/img/bulletbill.png' },
  { name: 'coin', img: 'assets/img/coin.png' },
  { name: 'goomba', img: 'assets/img/goomba.png' },
  { name: 'luigi', img: 'assets/img/luigi.png' },
  { name: 'mario', img: 'assets/img/mario.png' },
  { name: 'mushroom', img: 'assets/img/mushroom.png' },
  { name: 'peach', img: 'assets/img/peach.png' },
  { name: 'star', img: 'assets/img/star.png' },
  { name: 'thwomp', img: 'assets/img/thwomp.png' }
]
// Duplicate array to create a match for each card
let gameGrid = [...cards, ...cards]
// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random())

const buildGrid = () => {
  const gameEl = document.querySelector('#game')
  const gridEl = document.createElement('section')

  gridEl.classList.add('grid')

  gridEl.appendChild(buildCards(gameGrid))
  gameEl.appendChild(gridEl)

  // Add event listener to grid
  gridEl.addEventListener('click', (e) => {
    let clicked = e.target
    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('match')
    ) {
      return false
    }

    if (count < 2) {
      count++

      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name
      } else {
        secondGuess = clicked.parentNode.dataset.name
      }
      clicked.parentNode.classList.add('selected')

      // if either guesses are empty
      if (!!firstGuess && !!secondGuess) {
        (firstGuess === secondGuess) && setTimeout(match, delay)
        setTimeout(resetGuesses, delay)
      }

      previousTarget = clicked
    }
  })
}

const buildCards = (cards) => {

  // Using createDocumentFragment() method to reduce page reflow(redraw)
  const fragEl = document.createDocumentFragment()

  cards.forEach(card => {
    const cardEl = document.createElement('div')

    cardEl.classList.add('card')
    cardEl.dataset.name = card.name

    // create from of card
    const frontEl = document.createElement('div')
    frontEl.classList.add('front')

    // create back of card, which contains
    const backEl = document.createElement('div')
    backEl.classList.add('back')
    backEl.style.backgroundImage = `url(${card.img})`

    cardEl.appendChild(frontEl)
    cardEl.appendChild(backEl)
    fragEl.appendChild(cardEl)
  })

  return fragEl
}

const match = () => {
  const selected = document.querySelectorAll('.selected')
  selected.forEach(card => card.classList.add('match'))
}

const resetGuesses = () => {
  firstGuess = ''
  secondGuess = ''
  count = 0
  previousTarget = null

  const selected = document.querySelectorAll('.selected')
  selected.forEach(card => card.classList.remove('selected'))
}

buildGrid()