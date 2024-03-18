import Game from './components/Game';
import { Opponent } from './game/types';

const App: React.FC = () => {
  return (
    <div className='flex flex-col items-center m-8'>
      <Game opponent={Opponent.HUMAN}></Game>
    </div>

    // <div></div>
  );
}

export default App
