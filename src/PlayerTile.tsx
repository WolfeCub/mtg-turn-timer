import { FC } from 'react';
import { Player, useStore } from './store';

interface Props {
    player: Player;
}

const getBgColor = (time: number, totalTime: number) => {
    if (time <= 0)
        return 'bg-red-600';

    if (time <= 0.1 * totalTime)
        return 'bg-yellow-300';

    return 'bg-green-400';
};

export const PlayerTile: FC<Props> = ({ player }) => {
    const actions = useStore(s => s.actions);
    const totalTime = useStore(s => s.totalTime);
    const currentTurn = useStore(s => s.playerTurn);

    let bgColor = getBgColor(player.timeRemaining, totalTime);

    const minutes = Math.floor(player.timeRemaining / 60);
    const minutesStr = minutes > 0 ? `${minutes}m ` : '';
    const seconds = player.timeRemaining % 60;
    const formattedTime = `${minutesStr}${seconds.toFixed(1)}s`;

    const onTap = () => {
        if (player.name === currentTurn)
            actions.stopTime();
        else
            actions.changeTurn(player.name);
    };
    
    return (
        <div className={`w-full lg:w-64 grow rounded flex flex-col justify-center items-center ${bgColor}`} onPointerDown={onTap}>
            <div className="text-5xl font-bold">
                {player.name}
            </div>
            <div className="text-4xl font-bold">
                {formattedTime}
            </div>
        </div>
    )
}
