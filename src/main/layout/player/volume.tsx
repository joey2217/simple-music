import { Slider } from "@/components/ui/slider";
import { player, playerConfig, usePlayerStore } from "@/main/store/player";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useCallback, useState } from "react";

interface Props {
  value: number;
  onMute: () => void;
  onRestore: () => void;
}

function VolumeIcon({ value, onMute, onRestore }: Props) {
  if (value === 0) {
    return (
      <button onClick={onRestore} title="取消静音">
        <VolumeX size={18} />
      </button>
    );
  } else if (value < 50) {
    return (
      <button onClick={onMute} title="静音">
        <Volume1 size={18} />
      </button>
    );
  } else {
    return (
      <button onClick={onMute} title="静音">
        <Volume2 size={18} />
      </button>
    );
  }
}

let prevVol = playerConfig.volume;

export default function Volume() {
  const current = usePlayerStore((s) => s.current);
  const [vol, setVol] = useState(playerConfig.volume);

  const setMusicVolume = useCallback((value: number) => {
    setVol(value);
    playerConfig.volume = value;
    player.volume(value);
  }, []);

  const onMute = useCallback(() => {
    prevVol = playerConfig.volume;
    setMusicVolume(0);
  }, [setMusicVolume]);

  const onRestore = useCallback(() => {
    setMusicVolume(prevVol);
  }, [setMusicVolume]);

  return (
    <div className="flex items-center gap-1">
      <VolumeIcon value={vol} onMute={onMute} onRestore={onRestore} />
      <Slider
        disabled={current === undefined}
        value={[vol]}
        max={100}
        step={1}
        className="mx-auto"
        onValueChange={(value) => setMusicVolume(value[0])}
      />
    </div>
  );
}
