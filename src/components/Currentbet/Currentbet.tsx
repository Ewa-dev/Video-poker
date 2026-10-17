import { useCounter } from "../../Store/store";
import "./Currentbet.css";

export default function CounterButton() {
  const { bet, increment, decrement } = useCounter();
  return (
    <section>
      <p> Nåværende innsats: {bet}</p>
      <button type="button" onClick={decrement}>
        -
      </button>
      <button type="button" onClick={increment}>
        +
      </button>
    </section>
  );
}