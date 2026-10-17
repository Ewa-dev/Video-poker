
import type { Pokerhand } from "../../components/Pokerhand/Pokerhand";


const payout: {
  hand: Pokerhand;
  name: string;
  score: number;
}[] = [
  { hand: "royal-flush", name: "ROYAL FLUSH", score: 250 },

  { hand: "straight-flush", name: "STRAIGHT FLUSH", score: 100 },

  { hand: "four-of-a-kind", name: "FOUR OF A KIND", score: 50 },

  { hand: "full-house", name: "FULL HOUSE", score: 25 },

  { hand: "flush", name: "FLUSH", score: 15 },

  { hand: "straight", name: "STRAIGHT", score: 10 },

  { hand: "three-of-a-kind", name: "TRHEE OF A KIND", score: 5 },
  
  { hand: "two-pair", name: "TWO PAIR", score: 2 },
];

type PayouttableProps = { bet: number };

export default function Payouttable({ bet }: PayouttableProps) {
    return (<>
         <section>
            <h2>Gevinster og utbetalinger</h2>
            </section>
        

<table>
    <tbody>
        {payout.map((item) => (
            <tr key={item.hand}>
                <td>{item.name}</td>
                <td>{item.score}</td>
                <td>{item.score + bet} mynter</td>
            </tr>
        ))}
    </tbody>
</table>
</>
);
}