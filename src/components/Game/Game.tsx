import CounterButton from "../Currentbet/Currentbet";
import "./Game.css"
import Payouttable from "../Payouttable/Payouttable";
import { useCounter } from "../../Store/store";
import Deal from "./Deal";
import "../CurrentBet/Currentbet.css";


export default function Spill() {
    const bet = useCounter((state) => state.bet);
    

    return (
        <main>
            <Deal />

            <Payouttable bet={ bet } />
            
            <CounterButton />
        </main>
        );
    }