import CounterButton from "../Currentbet/Currentbet";
import "./Game.css";
import Payouttable from "../Payouttable/Payouttable";
import { useCounter } from "../../Store/store";
import Deal from "./Deal";
import TotalCoins from "../Totalcoins/Totalcoins";

export default function Spill() {
  const bet = useCounter((state) => state.bet);

  return (
    <main>
      <TotalCoins />

      <Deal />

      <Payouttable bet={bet} />

      <CounterButton />
    </main>
  );
}
