import { FC, useState } from "react";
import { produce } from 'immer';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { useStore } from "./store";

export const Setup: FC = () => {
    const actions = useStore(s => s.actions);
    const players = useStore(s => s.players);
    const totalTime = useStore(s => s.totalTime);

    const [newPlayer, setNewPlayer] = useState('');

    const modifyPlayer = (newText: string, index: number) =>
        actions.setPlayers(produce(players, (proxy) => {
            proxy[index].name = newText;
        }));

    const deletePlayer = (index: number) =>
        actions.setPlayers(players.filter((_, i) => i !== index));

    const addPlayer = () => {
        actions.addPlayer(newPlayer);
        setNewPlayer('');
    };

    const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const inputContainerStyle = "flex flex-row items-center space-x-2 pb-2";

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9/12 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white">
            <h1 className="text-2xl font-bold pb-2 text-underline">
                Setup
            </h1>

            <div className={inputContainerStyle}>
                <div>Time</div>
                <input className={inputStyle + ' w-2/12'} value={totalTime} type="number"
                    onChange={(e) => actions.setInitialTime(parseInt(e.target.value, 10))} />
                
            </div>

            <h1 className="text-lg pb-2">
                Names
            </h1>

            {players.map((p, i) => (
                <div className={inputContainerStyle}>
                    <input className={inputStyle} value={p.name} onChange={(e) => modifyPlayer(e.target.value, i)} />
                    <XCircleIcon className="h-5 w-5" onPointerDown={() => deletePlayer(i)} />
                </div>
            ))}

            <div className={inputContainerStyle}>
                <input className={inputStyle} value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)}
                       onKeyDown={(e) => { if (e.key === 'Enter') addPlayer() }} />
                <CheckCircleIcon className="h-5 w-5" onPointerDown={addPlayer} />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onPointerDown={actions.resetTime}>
                Reset Time
            </button>
        </div>
    );
}
