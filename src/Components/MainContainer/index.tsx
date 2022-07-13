import React from "react";
import { KeyConfig } from "../../Helpers/sounds";
import ScoreContainer from "../ScoreContainer";
import SequenceContainer from "../SequenceContainer";
import TargetContainer from "../TargetContainer";
import "./main-container.css";

type RecordItem = {
  key: string;
  time: number;
};

const generateTargetKeys = () => {
  const keys: string[] = [];
  while (keys.length < 50) {
    keys.push("a", "s", "d", "f", "g");
  }
  return keys;
};

const target_keys = generateTargetKeys();

type MainContainerProps = {
  has_game_started: boolean;
  is_playback: boolean;
  is_recording: boolean;
};

const MainContainer = ({ has_game_started }: MainContainerProps) => {
  const [active_index, setActiveIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (active_index + 1 > target_keys.length) {
      setTimeout(() => {
        alert("Game is complete!");
      });
    }
  }, [active_index]);

  React.useEffect(() => {
    if (has_game_started === false) {
      setScore(0);
      setActiveIndex(0);
    }
  }, [has_game_started]);

  const onKeyMatch = (keyConfig: KeyConfig) => {
    const target_key = target_keys[active_index];
    if (has_game_started) {
      if (target_key === keyConfig.key) {
        setScore(score + 1);
        setActiveIndex(active_index + 1);
      } else {
        setScore(score - 1);
      }
    }
  };

  return (
    <div className="main-container">
      <ScoreContainer score={score} />
      <SequenceContainer
        active_index={active_index}
        target_keys={target_keys}
      />
      <TargetContainer onKeyMatch={onKeyMatch} />
    </div>
  );
};

export default MainContainer;
