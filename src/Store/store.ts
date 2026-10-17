import { create } from "zustand";

type CounterState = {
  count: number;
  bet: number;
  decrement: () => void;
  increment: () => void;
};

export const useCounter = create<CounterState>((set) => ({
  count: 100, bet: 100,
  decrement: () => set((state) => ({ bet: Math.max(0, state.bet - 5) })),
  increment: () => set((state) => ({ bet: state.bet + 5 })),
}));
