import { useCounter } from "../../Store/store";

export default function TotalCoins() {
  const coins = useCounter((state) => state.player.coins);

  return (
    <section>
      {" "}
      <h2>Totalt mynter</h2>
      <p>{coins} mynter</p>
    </section>
  );
}
