import { useCounter } from "../../Store/store";
import "./Currentbet.css";

export default function CounterButton() {
  const { count, increment, decrement } = useCounter();
  return (
    <section>
      <p> Nåværende innsats: {count}</p>
      <button type="button" onClick={decrement}>
        -
      </button>
      <button type="button" onClick={increment}>
        +
      </button>
    </section>
  );
}
