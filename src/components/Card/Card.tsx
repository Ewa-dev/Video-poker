import "./Card.css";
import type { PlayingCard } from "./PlayingCard";

type CardProps = {
  card: PlayingCard;
  backside?: boolean;
};

export default function Card({ card, backside = false }: CardProps) {
  if (backside) {
    return <div className="Card-backside"></div>;
  }

  const symbols = {
    hjerter: "💕",
    ruter: "♦️",
    kløver: "♣️",
    spar: "♠️",
  };

  return (
    <div
      className={`Card ${
        card.color === "hjerter" || card.color === "ruter"
          ? "Card-red"
          : "Card-black"
      }`}
    >
      <div className="Card-center">
        <span>{card.value}</span>
        <span>{symbols[card.color]}</span>
      </div>
    </div>
  );
}
