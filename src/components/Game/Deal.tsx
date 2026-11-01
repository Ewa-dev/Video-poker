import { useState } from "react";
import { useCounter } from "../../Store/store";
import Card from "../Card/Card";
import type { PlayingCard } from "../Card/PlayingCard";
import { checkPokerHand } from "../Pokerhand/CheckPokerhand";
import PokerhandDisplay from "../Pokerhand/Pokerhand.tsx";

//Her vises det kort av player og håndteres kortvalg
export default function Deal() {
  const hand = useCounter((state) => state.hand);
  const startRound = useCounter((state) => state.startRound);
  const drawCards = useCounter((state) => state.drawCards);
  const roundActive = useCounter((state) => state.roundActive);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const finishRound = useCounter((state) => state.finishRound);

  //Unik id for hvert kort
  function getCardId(card: PlayingCard): string {
    return `${card.color}-${card.value}`;
  }

  //Her legges det til/fjerner kort fra valgte kort
  function toggleCard(card: PlayingCard) {
    const cardId = getCardId(card);

    setSelectedCards((previous) =>
      previous.includes(cardId)
        ? previous.filter((id) => id !== cardId)
        : [...previous, cardId],
    );
  }

  //Her startes det en ny runde og fjernes tidligere valg

  function handleStartRound() {
    setSelectedCards([]);
    startRound();
  }

  //Her beholdes det valgte kort og trekker nye kort
  function handleDrawCards() {
    const cardsToKeep = hand.filter((card) =>
      selectedCards.includes(getCardId(card)),
    );

    drawCards(cardsToKeep);
    setSelectedCards([]);
    finishRound();
  }
  const pokerHand =
    !roundActive && hand.length === 5 ? checkPokerHand(hand) : null;

  return (
    <section>
      <button type="button" onClick={handleStartRound} disabled={roundActive}>
        DEAL
      </button>

      <div className="cards-container">
        {hand.map((card) => {
          const cardId = getCardId(card);
          const isSelected = selectedCards.includes(cardId);

          return (
            <button
              key={cardId}
              type="button"
              className={isSelected ? "card-selected" : "card-button"}
              onClick={() => toggleCard(card)}
              disabled={!roundActive}
              aria-pressed={isSelected}
              aria-label={`${card.value} ${card.color}, ${isSelected ? "selected" : "not selected"}`}
            >
              <Card card={card} />
            </button>
          );
        })}
      </div>

      <p>Valgte kort: {selectedCards.length}</p>

      <button type="button" onClick={handleDrawCards} disabled={!roundActive}>
        DRAW
      </button>

      {pokerHand && <PokerhandDisplay hand={pokerHand} />}
    </section>
  );
}
