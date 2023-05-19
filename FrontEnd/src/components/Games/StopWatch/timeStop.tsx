import * as React from "react";
import "./timeStop.css";
import Recorder from "./recorder/recorder";
import Controller from "./controller/controller";

function TimeStopGame(props: { setGameName: (name: string) => void }) {
  const [scores, setScores] = React.useState<any[]>([]);
  const [printScore, setPrintScore] = React.useState<any[]>([]);
  const [gameModeChecker, setGameModeChecker] = React.useState("blind");

  //props로 게임 이름 전달
  const { setGameName } = props;

  React.useEffect(() => {
    setGameName("10초 맞추기");
  });

  return (
    <>
      <div className="game">
        <a id="title-text">미니미니게임 프로젝트</a>

        <Controller
          scores={scores}
          setScores={setScores}
          printScore={printScore}
          setPrintScore={setPrintScore}
          gameModeChecker={gameModeChecker}
          setGameModeChecker={setGameModeChecker}
        />
        <Recorder
          scores={scores}
          printScore={printScore}
          setScores={setScores}
          gameModeChecker={gameModeChecker}
          // setGameModeChecker={setGameModeChecker}
        />
      </div>
    </>
  );
}

export default TimeStopGame;
