import Card from "../../components/Card/Card";
import type { PlayingCard } from "../Card/PlayingCard";
import CounterButton from "../Currentbet/Currentbet";
import "./Game.css"
import Payouttable from "../Payouttable/Payouttable";
import { useCounter } from "../../Store/store";


/*kort og test hvordan det ser ut med 5 kort*/
export default function Spill() {
    const bet = useCounter((state) => state.bet);

    const cards: PlayingCard [] = [{
        color: "hjerter",
        value: "3",
    },
    {
        color: "spar",
        value: "5",
    },
    {
        color: "hjerter",
        value: "K",
    },
    {
        color: "ruter",
        value: "A",
    },
    {
        color: "kløver",
        value: "10",
    }
];
    

    return (
        <main>
            <div className="cards-container"> 
                {cards.map((card) => <Card 
                key={`${card.color}-${card.value}`} 
                card={card} 
                /> 
                )}
                <Payouttable bet={ bet } />

            </div>
             <CounterButton />
        </main>
        );
    }