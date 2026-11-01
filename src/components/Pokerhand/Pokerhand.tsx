import type { Pokerhand } from "./Pokerhand";

type PokerhandProps = {
  hand: Pokerhand;
};

const handNames: Record<Pokerhand, string> = {
  "royal-flush": "ROYAL FLUSH",
  "straight-flush": "STRAIGHT FLUSH",
  "four-of-a-kind": "FOUR OF A KIND",
  "full-house": "FULL HOUSE",
  "flush": "FLUSH",
  "straight": "STRAIGHT",
  "three-of-a-kind": "THREE OF A KIND",
  "two-pair": "TWO PAIR",
  "one-pair": "ONE PAIR"
};

//Her vises det navnet av nåværende pokerhånd

export default function PokerhandDisplay({ hand }: PokerhandProps) {
  return (
    <section>
      <h2>Nåværende pokerhånd</h2>
      <p>{handNames[hand]}</p>
    </section>
  );
}
