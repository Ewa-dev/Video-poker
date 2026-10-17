import { useCounter } from "../../Store/store";
import Card from "../Card/Card";

export default function Deal() {
  const hand = useCounter((state) => state.hand);
  const startRound = useCounter((state) => state.startRound);
  const drawCards = useCounter((state) => state.drawCards);
  const roundActive = useCounter((state) => state.roundActive);

  return (
    <section>
      <button
        type="button"
        onClick={startRound}
        disabled={roundActive}
      >
        DEAL
      </button>

      <div className="cards-container">
        {hand.map((card) => (
          <Card
            key={`${card.color}-${card.value}`}
            card={card}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => drawCards([])}
        disabled={!roundActive}
      >
        DRAW
      </button>
    </section>
  );
}