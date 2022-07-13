import React from "react";
import { KeyConfig } from "../../Helpers/sounds";
import ScoreContainer from "../ScoreContainer";
import SequenceContainer from "../SequenceContainer";
import TargetContainer from "../TargetContainer";
import "./main-container.css";

type RecordItem = {
  keyConfig: KeyConfig;
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
  setIsPlayback: (value: boolean) => void;
};

const MainContainer = ({
  has_game_started,
  is_playback,
  is_recording,
  setIsPlayback,
}: MainContainerProps) => {
  const [active_index, setActiveIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [recording, setRecording] = React.useState<RecordItem[]>([]);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [activeKey, setActiveKey] = React.useState<string>();

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

  React.useEffect(() => {
    if (is_recording) {
      setStartTime(Date.now());
    }
  }, [is_recording]);

  React.useEffect(() => {
    if (is_playback) {
      const promises: Promise<void>[] = [];
      recording.forEach((item) => {
        const promise = new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            playAudioAndHighlight(item.keyConfig).then(resolve);
          }, item.time);
        });
        promises.push(promise);
      });

      Promise.all(promises).then(() => {
        setIsPlayback(false);
      });
    }
  }, [is_playback]);

  const playAudioAndHighlight = (keyConfig: KeyConfig) => {
    setActiveKey(keyConfig.key);
    const promise = new Promise<void>((resolve, reject) => {
      const audio = new Audio(keyConfig?.sound);
      audio.play();
      audio.onended = () => {
        resolve();
        setActiveKey(undefined);
      };
    });
    return promise;
  };

  const onKeyMatch = (keyConfig: KeyConfig) => {
    const target_key = target_keys[active_index];

    if (is_recording) {
      const newRecordings = [
        ...recording,
        {
          keyConfig: keyConfig,
          time: Date.now() - startTime,
        },
      ];
      setRecording(newRecordings);
    }

    if (has_game_started) {
      if (target_key === keyConfig.key) {
        setScore(score + 1);
        setActiveIndex(active_index + 1);
      } else {
        setScore(score - 1);
      }
    }
    playAudioAndHighlight(keyConfig);
  };

  return (
    <div className="main-container">
      <ScoreContainer score={score} />
      <SequenceContainer
        active_index={active_index}
        target_keys={target_keys}
      />
      <TargetContainer activeKey={activeKey} onKeyMatch={onKeyMatch} />
    </div>
  );
};

export default MainContainer;
