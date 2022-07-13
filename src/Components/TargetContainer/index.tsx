import React from "react";
import { KeyConfig, keyConfigs } from "../../Helpers/sounds";
import "./target-container.css";

type TargetContainerProps = {
  onKeyMatch: (keyConfig: KeyConfig) => void;
  activeKey?: string;
};

const TargetContainer = ({ onKeyMatch, activeKey }: TargetContainerProps) => {
  React.useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      const key = ev.key;

      const keyConfig = keyConfigs.find((item) => item.key === key);

      if (keyConfig) {
        onKeyMatch(keyConfig);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyMatch]);

  return (
    <div className="control container">
      {keyConfigs.map((item) => (
        <div
          key={item.id}
          className={`control card ${activeKey === item.key && "playing"}`}
        >
          <div className="label container">{item.key}</div>
          <div className="key container">{item.id.split("_").join(" ")}</div>
        </div>
      ))}
    </div>
  );
};

export default TargetContainer;
