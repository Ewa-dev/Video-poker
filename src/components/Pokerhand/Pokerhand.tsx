import { Pokerhand } from "./Pokerhand";

type PokerhandProps = {
  hand: Pokerhand;
};

export default function PokerhandDisplay({ hand }: PokerhandProps) {
  return (
    <section>
      <p>{hand}</p>
    </section>
  );
}
