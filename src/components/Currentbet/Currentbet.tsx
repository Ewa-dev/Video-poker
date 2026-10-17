import { useCounter } from "../../Store/store";
import "./Currentbet.css";

export default function CounterButton() {
  const { bet, incrementBet, decrementBet } = useCounter();
  return (
    <section>
      <p> Nåværende innsats: {bet}</p>
      <button type="button" onClick={decrementBet}>
        -
      </button>
      <button type="button" onClick={incrementBet}>
        +
      </button>
    </section>
  );
}
