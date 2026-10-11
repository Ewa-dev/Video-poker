import Card from "../../components/Card/Card";
import type { PlayingCard } from "../Card/PlayingCard";
import CounterButton from "../Currentbet/Currentbet";

/*kort og test hvordan det ser ut med 5 kort*/
export default function Spill() {
    const myCard: PlayingCard = {
        color: "hjerter",
        value: "3",
    };
    

    return (
        <main>
            <Card card={myCard} />
             <CounterButton />
        </main>
    )
}