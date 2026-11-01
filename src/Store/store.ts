import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayingCard } from "../components/Card/PlayingCard";
import type { Player } from "../components/SpillerForm/Player";
import { checkPokerHand } from "../components/Pokerhand/CheckPokerhand";
import { payout } from "../components/Payouttable/Payouttable";

type GameState = {
  deck: PlayingCard[];
  hand: PlayingCard[];
  discardedCards: PlayingCard[];
  player: Player;
  players: Player[];
  bet: number;
  roundActive: boolean;
  roundPaid: boolean;

  setBet: (bet: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  startRound: () => void;
  drawCards: (cardsToKeep: PlayingCard[]) => void;
  finishRound: () => void;
  addPlayer: (name: string) => void;
  selectPlayer: (id: string) => void;
};

const colors: PlayingCard["color"][] = ["kløver", "ruter", "hjerter", "spar"];

const values: PlayingCard["value"][] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

//Her lages det dekk av 52 kort
function createDeck(): PlayingCard[] {
  return colors.flatMap((color) => values.map((value) => ({ color, value })));
}

//Her stokkes dekk
function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

//Her opprettes det Zustand store og lagres state i localStorage
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
      players: [
        {
          id: "player-1",
          name: "Player 1",
          coins: 100,
        },
      ],

      bet: 1,
      roundActive: false,
      roundPaid: true,

      //Bet endres hvis round er ikke aktiv og player har nok mynter
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

      //Her legges det til/reduseres 1 mynt til/fra bet
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

      //ny runde
      startRound: () => {
        const { player, bet, roundActive } = get();

        if (roundActive || bet > player.coins || bet < 1) {
          return;
        }
        //Ny stokk med 5 kort
        const shuffledDeck = shuffleDeck(createDeck());

        const updatedPlayer = {
          ...player,
          coins: player.coins - bet,
        };

        set({
          deck: shuffledDeck.slice(5),
          hand: shuffledDeck.slice(0, 5),
          discardedCards: [],
          player: updatedPlayer,
          players: get().players.map((item) =>
            item.id === player.id ? updatedPlayer : item,
          ),
          roundActive: true,
          roundPaid: false,
        });
      },

      //Her beholdes det valgte kort og ersttates resten
      drawCards: (cardsToKeep) => {
        const { deck, hand, discardedCards, roundActive } = get();

        if (!roundActive) return;

        //Her finnes det kort spilleren vil beholde
        const keptCards = hand.filter((card) =>
          cardsToKeep.some(
            (kept) => kept.color === card.color && kept.value === card.value,
          ),
        );

        //Her finnes det kort som skal kastes
        const newDiscardedCards = hand.filter(
          (card) =>
            !keptCards.some(
              (kept) => kept.color === card.color && kept.value === card.value,
            ),
        );

        //hvor mange nye kort trengs
        const numberOfCardsToDraw = 5 - keptCards.length;

        //Her tas de nye kort fra stokken
        const drawnCards = deck.slice(0, numberOfCardsToDraw);
        const remainingDeck = deck.slice(numberOfCardsToDraw);

        set({
          hand: [...keptCards, ...drawnCards],
          deck: remainingDeck,
          discardedCards: [...discardedCards, ...newDiscardedCards],
          roundActive: false,
        });
      },

      finishRound: () => {
        const { hand, player, players, bet, roundActive, roundPaid } = get();
        if (roundActive || roundPaid || hand.length !== 5) {
          return;
        }

        const pokerHand = checkPokerHand(hand);

        //find() leter etter objektet som har samme pokerhånd som spilleren
        const winningHand = payout.find((item) => item.hand === pokerHand);

        const winnings = winningHand ? winningHand.score * bet : 0;

        const updatedPlayer = {
          ...player,
          coins: player.coins + winnings,
        };

        set({
          player: updatedPlayer,
          players: players.map((item) =>
            item.id === player.id ? updatedPlayer : item,
          ),

          roundPaid: true,
        });
      },

      addPlayer: (name) => {
        const trimmedName = name.trim();
        //trim for å unngå mellomrom

        if (!trimmedName) return;
        const { players } = get();

        if (
          players.some(
            (player) => player.name.toLowerCase() === trimmedName.toLowerCase(),
          )
        ) {
          return;
        }

        const newPlayer: Player = {
          id: `player-${Date.now()}`,
          name: trimmedName,
          coins: 100,
        };

        set({
          players: [...players, newPlayer],
        });
      },

      selectPlayer: (id) => {
        const { players, roundActive } = get();

        if (roundActive) return;

        const selectedPlayer = players.find((player) => player.id === id);

        if (!selectedPlayer) return;

        set({
          player: selectedPlayer,
          bet: Math.min(get().bet, Math.max(1, selectedPlayer.coins)),
        });
      },
    }),

    {
      name: "video-poker-game",
    },
  ),
);
