import boom from "../Assets/sounds/boom.wav";
import clap from "../Assets/sounds/clap.wav";
import hi_hat from "../Assets/sounds/hi_hat.wav";
import kick from "../Assets/sounds/kick.wav";
import open_hat from "../Assets/sounds/open_hat.wav";
import ride from "../Assets/sounds/ride.wav";
import snare from "../Assets/sounds/snare.wav";
import tink from "../Assets/sounds/tink.wav";
import tom from "../Assets/sounds/tom.wav";

export type KeyConfig = {
  id: string;
  key: string;
  sound: string;
};

export const keyConfigs: KeyConfig[] = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "hi_hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "open_hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "snare", key: "j", sound: snare },
  { id: "tim", key: "k", sound: tink },
  { id: "tom", key: "l", sound: tom },
];
