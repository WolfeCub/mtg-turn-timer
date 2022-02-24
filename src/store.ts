import create from 'zustand';
import { combine, persist } from 'zustand/middleware';
import { produce } from 'immer';

export interface Player {
    name: string;
    timeRemaining: number;
    lastUpdate: number | null;
}

interface StoreState {
    totalTime: number;
    players: Player[];
    playerTurn: string;
}

const initialState: StoreState = {
    totalTime: 10,
    players: [],
    playerTurn: '',
};

export const useStore = create(persist(combine(initialState, (set, get) => ({
    actions: {
        tickDown: () => {
            const newPlayers = produce(get().players, (proxy) => {
                proxy.forEach(p => {
                    if (! p.lastUpdate) return;


                    const now = Date.now();
                    p.timeRemaining -= (now - p.lastUpdate) / 1000;
                    p.lastUpdate = now;

                    if (p.timeRemaining <= 0) {
                        p.lastUpdate = null;
                        p.timeRemaining = 0;
                    }
                });
            });
            set({ players: newPlayers });
        },
        changeTurn: (newPlayerName: string) => {
            const newPlayers = produce(get().players, (proxy) => {
                const oldPlayer = proxy.find(o => o.name === get().playerTurn);
                if (oldPlayer)
                    oldPlayer.lastUpdate = null;

                const newPlayer = proxy.find(o => o.name === newPlayerName);
                if (newPlayer)
                    newPlayer.lastUpdate = Date.now();

            });
            set({
                players: newPlayers,
                playerTurn: newPlayerName,
            });
        },
        setInitialTime: (newTime: number) => set({ totalTime: newTime }),
        addPlayer: (name: string) => set({
            players: [...get().players, { name: name, timeRemaining: get().totalTime, lastUpdate: null }],
        }),
        setPlayers: (players: Player[]) => set({ players: players }),
        resetTime: () => {
            const newPlayers = produce(get().players, (proxy) => {
                proxy.forEach(p => {
                    p.timeRemaining = get().totalTime;
                    p.lastUpdate = null;
                });
            });
            set({
                players: newPlayers,
                playerTurn: '',
            });
        },
        stopTime: () => {
            const newPlayers = produce(get().players, (proxy) => {
                proxy.forEach(p => {
                    p.lastUpdate = null;
                });
            });
            set({
                players: newPlayers,
                playerTurn: '',
            });
        },

}})), {
    name: 'persistant-storage',
    partialize: (state) =>
        Object.fromEntries(
            Object.entries(state).filter(([key]) => key != 'actions')
        ),
}));

    
