import React, { useEffect, useRef, useState } from 'react'
import GomokuGame from '../game/GomokuGame';
import { GameConfig } from '../game/types';
import MessageBox from './MessageBox';

const Game: React.FC<GameConfig> = (props: GameConfig) => {
    const container = useRef<any>(null);
    const [gomokuGame, setGomokuGame] = useState<GomokuGame|null>(null)

    useEffect(() => {
        let newGomokuGame = new GomokuGame(
            container.current,
            props
        )
        setGomokuGame(newGomokuGame);
    }, []);
  
    return (<>
        <div className='flex justify-center'>
            <div ref={container} className='w-[600px] h-[600px] bg-slate-50' style={{backgroundImage: 'url(../../src/assets/background.jpg)'}}></div>
            <MessageBox></MessageBox>
        </div>

        
    </>)
  };
  
  export default Game;
