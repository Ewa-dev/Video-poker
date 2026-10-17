import { useState } from "react";
import type { PlayingCard } from "../Card/PlayingCard";
import Card from "../Card/Card";


const colors: PlayingCard["color"][] = [
  "kløver",
  "ruter",
  "hjerter",
  "spar"
];

const values: PlayingCard["value"][] = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];

function createDeck(): PlayingCard[] {
  return colors.flatMap((color) =>
    values.map((value) => ({ color, value }))
);
}

export default function Deal() { 
const [cards, setCards] = useState<PlayingCard[]>([]);

function dealCards() {
    const deck = createDeck();
  
/*stokking*/
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1 ));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
/*del ut 5 kort*/
  setCards(deck.slice(0, 5));
}

return (
  <section>
    <button type="button" onClick={dealCards}>DEAL</button>
    <div className="cards-container">{cards.map((card) => (
      <Card key={`${card.color}-${card.value}`} card={card} />
    ))}
    </div>
  </section>
);
}
