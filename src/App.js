//add shuffle animation
//add a backend

import { useState, useEffect} from "react";
import Card from "./components/Card";
import "./App.css";
import Confetti from 'react-confetti';
import useWindowSize from "./hooks/useWindowSize";


//activated when shuffle button is clicked
function shuffle(arr) {
  var j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

//called outside of app function so not re-set on re-render
let choiceNumber = 1;
let firstChoice = "";
let secondChoice = "";
let showButton = true;
let allowClick = false;
let score = 0;

export default function App() {
  const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  //creates an array of card objects with assigned values
  let card = [];
  const cardDeckCopy = [];
  const [cardDeck, setCardDeck] = useState([]);

  for (let x = 0; x < suits.length; x++) {
    for (let y = 0; y < values.length; y++) {
      card = {
        id: cardDeckCopy.length,
        suit: suits[x],
        val: values[y],
        col: `suits${suits[x]}`,
        found: true,
      };
      cardDeckCopy.push(card);
    }
  }

  //the deck is stored in state on first render with effect hook
  useEffect(() => {
    setCardDeck([...cardDeckCopy]);
  }, []);

  //click event to register the users first and second choice of cards.
  //turn is stored in state  so we can have a counter at the bottom that updates state.
  //the items value property is stored and will be compared later to confirm if match.
  //choice number is incremented up and down between first and second choice.

  const [turn, setTurn] = useState(0);

  function selectCard(item) {
    if (allowClick && !item.found && choiceNumber === 1) {
      firstChoice = item;
      let prevDeck = [...cardDeck];
      prevDeck[prevDeck.indexOf(firstChoice)].found = true;
      setCardDeck([...prevDeck]);
      choiceNumber++;
    } else if (allowClick && !item.found && choiceNumber === 2) {
        allowClick = false
      secondChoice = item;
      if (firstChoice.val === secondChoice.val) {
        setTurn((turn) => turn + 1);
        let prevDeck = [...cardDeck];
        prevDeck[prevDeck.indexOf(secondChoice)].found = true;
        setCardDeck([...prevDeck]);
        choiceNumber--;
        allowClick = true
        score++
        if (score >= (prevDeck.length / 2)) {
            console.log('winner')
        }
      } else {
        setTurn((turn) => turn + 1);
        let prevDeck = [...cardDeck];
        prevDeck[prevDeck.indexOf(secondChoice)].found = true;
        setCardDeck([...prevDeck]);
        setTimeout(function () {
          prevDeck[prevDeck.indexOf(firstChoice)].found = false;
          prevDeck[prevDeck.indexOf(secondChoice)].found = false;
          setCardDeck([...prevDeck]);
          firstChoice = "";
          secondChoice = "";
          choiceNumber--;
          allowClick = true
        }, 700);
      }
    }
  }

  //button used during development
  function handleShuffleClick() {
    let preShuffle = [...cardDeck];
    shuffle(preShuffle);
    setCardDeck([...preShuffle]);
  }

  //button used during development
  function handleFlip() {
    let preFlip = [...cardDeck];
    preFlip = preFlip.map((card) => ({ ...card, found: !card.found }));
    setCardDeck([...preFlip]);
  }

  //start button that shuffles the cards, shows them for 5 seconds then flips them. button only shows until clicked.
  function handleStart() {
    setTurn(prev => 0)
    score = 0;
    showButton = false;
    let preShuffle = [...cardDeck];
    shuffle(preShuffle);
    setCardDeck([...preShuffle]);
    setTimeout(function () {
      let preFlip = [...preShuffle];
      preFlip = preFlip.map((card) => ({ ...card, found: !card.found }));
      setCardDeck([...preFlip]);
      allowClick = true
    }, 5000);
  }

  const size = useWindowSize();


  //we feed the cardDeck array of values to the card component to render a deck of cards on screen.
  //can either show face or be blank dependent on found value.
  //handleClick function on each card for the selectCard function used during development
  //button to trigger the shuffle function and a counter of turns added at bottom used during development
  //start button only shows until clicked
  return (
    <div className="container">
      <h3 className="turns">Find matching numbers to win. Turns used: {turn}</h3>
      <div className="cardContainer">
        {cardDeck.map((item) => (
          <Card
            val={item.val}
            suit={item.suit}
            col={item.col}
            handleClick={() => selectCard(item)}
            found={item.found}
          />
        ))}
        {showButton && (
        <button type="button" onClick={handleStart} className='startButton'>
          START GAME
        </button>
      )}
      {score >= (cardDeckCopy.length / 2) && (
        <>
        <Confetti
        width={size.width}
        height={size.height}
      />
        <button type="button" onClick={handleStart} className='winnerButton'>
          WINNER!!! TRY AGAIN?
        </button>
        </>
      )}
      </div>
      {/* <button type="button" onClick={handleShuffleClick}>
        shuffle
      </button>
      <button type="button" onClick={handleFlip}>
        flip
      </button> */}
    </div>
  );
}