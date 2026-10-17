import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../components/Card/PlayingCard";
import type {Player } from "../components/SpillerForm/Player";

type GameState = {
  deck: PlayingCard[];
  hand: PlayingCard[];
  discardedCards: PlayingCard[];
  player: Player;
  bet: number;
  roundActive: boolean;
  

  setBet: (bet: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  startRound: () => void;
  drawCards: (cardsToKeep: PlayingCard[]) => void;
};

const colors: PlayingCard["color"][] = [
  "kløver",
  "ruter",
  "hjerter",
  "spar"
];

const values: PlayingCard["value"][] = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];

function createDeck(): PlayingCard[] {
  return colors.flatMap((color) =>
    values.map((value) => ({ color, value }))
);
}

function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export const useCounter = create<GameState>()(
  persist(
    (set, get) => ({
      deck: [],
      hand: [],
      discardedCards: [],
      player: {
        id: "player-1",
        name: "Player 1",
        coins: 100,
      },
      bet: 1,
      roundActive: false,

      setBet: (bet) => {
        const { player, roundActive } = get();

        if (
          !roundActive &&
          Number.isInteger(bet) &&
          bet >= 1 &&
          bet <= player.coins
        ) {
          set({ bet });
        }
      },

      incrementBet: () => {
        const { bet, player, roundActive } = get();

        if (!roundActive && bet < player.coins) {
          set({ bet: bet + 1 });
        }
      },

      decrementBet: () => {
        const { bet, roundActive } = get();

        if (!roundActive && bet > 1) {
          set({ bet: bet - 1 });
        }
      },

      startRound: () => {
        const { player, bet, roundActive } = get();

  
        if (roundActive || bet > player.coins || bet < 1) {
          return;
        }

        const shuffledDeck = shuffleDeck(createDeck());

        set({
          deck: shuffledDeck.slice(5),
          hand: shuffledDeck.slice(0, 5),
          discardedCards: [],
          player: {
            ...player,
            coins: player.coins - bet,
          },
          roundActive: true,
        });
      },

      drawCards: (cardsToKeep) => {
        const { deck, hand, discardedCards, roundActive } = get();

        if (!roundActive) return;

      
        const keptCards = hand.filter((card) =>
          cardsToKeep.some(
            (kept) =>
              kept.color === card.color &&
              kept.value === card.value
          )
        );

        const newDiscardedCards = hand.filter(
          (card) =>
            !keptCards.some(
              (kept) =>
                kept.color === card.color &&
                kept.value === card.value
            )
        );

        const numberOfCardsToDraw = 5 - keptCards.length;
        const drawnCards = deck.slice(0, numberOfCardsToDraw);
        const remainingDeck = deck.slice(numberOfCardsToDraw);

        set({
          hand: [...keptCards, ...drawnCards],
          deck: remainingDeck,
          discardedCards: [...discardedCards, ...newDiscardedCards],
          roundActive: false,
        });
      },
    }),
    {
      name: "video-poker-game",
    }
  )
);
