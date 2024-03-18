import React, { useState } from 'react'
import { Player } from '../game/types';

const MessageBox: React.FC = () => {
    const [current, setCurrent] = useState("");

    document.addEventListener('changeTurn', (e:any)=>{
        if(e.detail.turn === Player.BLACK){
            setCurrent('黑棋')
        }else if(e.detail.turn === Player.WHITE){
            setCurrent('白棋')
        }
    })
    return (
        <div className='w-[300px] h-[600px] bg-slate-300 flex justify-center p-2' style={{backgroundImage: "url(../../src/assets/message.jpg)"}}>
            {`当前执棋：${current}`}
        </div>
    )
}
export default MessageBox
