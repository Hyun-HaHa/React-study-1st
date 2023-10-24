// import Dice from "./Dice";
// import HandIcon from "./HandIcon";
import HandButton from './HandButton';
import Button from './Button';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';
import { useState } from 'react';

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
    const comparison = compareHand(me, other);
    if (comparison > 0) return '승리';
    if (comparison < 0) return '패배';
    return '무승부';
  }

function App() {

    const [hand, setHand]               = useState(INITIAL_VALUE);
    const [otherHand, setOtherHand]     = useState(INITIAL_VALUE);
    const [gameHistory, setGameHistory] = useState([]);
    const [score, setScore]             = useState(0);
    const [otherScore, setOtherScore]   = useState(0);
    const [bet, setBet]                 = useState(1);

    const handleButtonClick = (nextHand) => {

        const nextOtherhand     = generateRandomHand();
        const nextHistoryItem   = getResult(nextHand, nextOtherhand);
        const comparison        = compareHand(nextHand, nextOtherhand);

        setHand(nextHand);
        setOtherHand(nextOtherhand);
        setGameHistory([...gameHistory, nextHistoryItem]);

        if (comparison > 0) setScore(score + bet);
        if (comparison < 0) setOtherScore(otherScore + bet);
    };

    // 처음부터 버튼 - 초기화
    const handleClearClick = () => {

        setHand(INITIAL_VALUE);
        setOtherHand(INITIAL_VALUE);
        setGameHistory([]);
        setScore(0);
        setOtherScore(0);
        setBet(1);

    }

    const handleBetChange = (e) => {
        
        let num = Number(e.target.value);

        if(num > 9) num %= 10;  // 1 ~ 9 사이의 숫자만 가능
        if(num < 1) num = 1;    

        num = Math.floor(num);

        setBet(num);

    }

    return (
        <div>
            <Button onClick={handleClearClick}>처음부터</Button>
            
            <div>
                {score} : {otherScore}
            </div>

            <div>
                <HandIcon value={hand} />
                VS
                <HandIcon value={otherHand} />
            </div>

            <div>
                <input type="number" value={bet} min={1} max={9} onChange={handleBetChange}></input>
            </div>

            <p>승부 기록 : {gameHistory.join(', ')}</p>

            <div>
                <HandButton value="rock"    onClick={handleButtonClick} />
                <HandButton value="scissor" onClick={handleButtonClick} />
                <HandButton value="paper"   onClick={handleButtonClick} />
            </div>
        </div>
    )
}

export default App; 