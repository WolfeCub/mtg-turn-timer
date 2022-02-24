import { FC, useEffect, useState } from 'react';
import { PlayerTile } from './PlayerTile';
import { useStore } from './store';
import { CogIcon } from '@heroicons/react/solid';
import { Modal } from './Modal';
import { Setup } from './Setup';

export const App: FC = () => {
    const actions = useStore(s => s.actions);
    const players = useStore(s => s.players);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            actions.tickDown();
        }, 250);

        return () => clearInterval(timer);
    }, []);

    const col = Math.ceil(players.length / 2);

    return (
        <>
            <Modal showModal={showModal}>
                <Setup />
            </Modal>
            <div className="absolute h-10 w-10 bottom-2 right-2">
                <CogIcon onPointerDown={() => setShowModal(!showModal)} />
            </div>

            {players.length === 0
                ?
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-5xl font-bold">
                        MTG Turn Timer
                    </h1>
                </div>
                :
                <div className="h-screen flex flex-col lg:flex-row flex-wrap gap-2 p-2">
                    {players.map(p => (
                        <PlayerTile player={p} />
                    ))}
                </div>
            }
        </>
    )
}
