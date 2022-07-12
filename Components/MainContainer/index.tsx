import React from "react";
import { KeyConfig } from "../../Helpers/sounds";
import ScoreContainer from "../ScoreContainer";
import SequenceContainer from "../SequenceContainer";
import TargetContainer from "../TargetContainer";
import "./main-container.css";

const generateTargetKeys = () => {
  const keys: { key: string; index: number }[] = [];
  while (keys.length < 50) {
    ["a", "s", "d", "f", "g"].forEach((k) => {
      keys.push({ key: k, index: keys.length });
    });
  }
  return keys;
};

const keys = generateTargetKeys();

type MainContainerProps = {
  has_game_started: boolean;
};

const MainContainer = ({ has_game_started }: MainContainerProps) => {
  const [target_keys, setTargetKeys] = React.useState(keys.slice(0, 4));
  const [active_index, setActiveIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const updateTargetKeys = () => {
    const empty_elements = active_index < 3 ? 3 - active_index : 0;
    setTargetKeys(keys.slice(active_index, active_index + 7 - empty_elements));
  };

  const onKeyMatch = (keyConfig: KeyConfig) => {
    const target_key = target_keys[active_index];
    if (has_game_started) {
      console.log(target_key.key);
      if (target_key?.key === keyConfig.key) {
        setScore(score + 1);
        setActiveIndex(active_index + 1);
        updateTargetKeys();
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
