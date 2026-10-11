import { create } from "zustand";

type CounterState = {
  count: number;
  decrement: () => void;
  increment: () => void;
};

export const useCounter = create<CounterState>((set) => ({
  count: 100,
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 5) })),
  increment: () => set((state) => ({ count: state.count + 5 })),
}));
