import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LikeButton } from "@/main/components/music-list";
import { usePlayerStore, PlayMode, playerConfig, player } from "@/main/store/player";
import { ArrowRightToLine, PlayIcon, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react";
import React, { SVGProps, useMemo, useState } from "react";

export default function Control() {
  const current = usePlayerStore((s) => s.current);
  const paused = usePlayerStore((s) => s.paused);
  const playNext = usePlayerStore((s) => s.playNext);
  const disabled = current == null;

  return (
    <div>
      <div className="flex justify-center items-center gap-3 mb-1">
        {current && <LikeButton music={current} />}
        <Button
          disabled={disabled}
          variant="ghost"
          size="icon"
          className="rounded-full text-base"
          title="上一首"
          onClick={() => playNext("prev")}
        >
          <SkipBack />
        </Button>
        {paused ? (
          <Button
            disabled={disabled}
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12 text-2xl"
            title="播放"
            onClick={() => player.play()}
          >
            <PlayIcon />
          </Button>
        ) : (
          <Button
            disabled={disabled}
            size="icon"
            variant="secondary"
            className="rounded-full w-12 h-12 text-2xl"
            onClick={() => player.pause()}
            title="暂停"
          >
            <PauseIcon />
          </Button>
        )}
        <Button
          disabled={disabled}
          variant="ghost"
          size="icon"
          className="rounded-full text-base"
          title="下一首"
          onClick={() => playNext("next")}
        >
          <SkipForward />
        </Button>
        <PlayModeButton />
      </div>
      <ProgressBar />
    </div>
  );
}

function ProgressBar() {
  const duration = usePlayerStore((s) => s.duration);
  const seek = usePlayerStore((s) => s.seek);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div>{toMinutes(seek)}</div>
      <Slider
        min={0}
        max={duration}
        value={[seek]}
        onValueChange={(values) => player.seek(values[0])}
        className="range range-xs range-primary flex-1"
      />
      <div>{toMinutes(duration)}</div>
    </div>
  );
}

function toMinutes(s: number) {
  const minutes = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes} : ${seconds}`;
}

const modes: PlayMode[] = ["sequence", "loop", "repeat", "shuffle"];

const ICON_SIZE = 16;

interface ModeIcon {
  icon: React.ReactNode;
  title: string;
}

const modeIcons: { [p in PlayMode]: ModeIcon } = {
  sequence: {
    icon: <ArrowRightToLine size={ICON_SIZE} />,
    title: "顺序播放",
  },
  loop: {
    icon: <Repeat size={ICON_SIZE} />,
    title: "列表循环",
  },
  repeat: {
    icon: <Repeat1 size={ICON_SIZE} />,
    title: "单曲循环",
  },
  shuffle: {
    icon: <Shuffle size={ICON_SIZE} />,
    title: "随机播放",
  },
};

function PlayModeButton() {
  const [m, setM] = useState<PlayMode>(playerConfig.mode);

  const modeIcon = useMemo(() => modeIcons[m], [m]);

  const onClick = () => {
    const nextMode = modes[(modes.indexOf(m) + 1) % modes.length];
    setM(nextMode);
    playerConfig.mode = nextMode;
  };

  return (
    <button title={modeIcon.title} onClick={onClick}>
      {modeIcon.icon}
    </button>
  );
}

function PauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
      <path
        fill="currentColor"
        d="M11.75 6A3.75 3.75 0 0 0 8 9.75v28.5A3.75 3.75 0 0 0 11.75 42h6.5A3.75 3.75 0 0 0 22 38.25V9.75A3.75 3.75 0 0 0 18.25 6h-6.5Zm18 0A3.75 3.75 0 0 0 26 9.75v28.5A3.75 3.75 0 0 0 29.75 42h6.5A3.75 3.75 0 0 0 40 38.25V9.75A3.75 3.75 0 0 0 36.25 6h-6.5Z"
      ></path>
    </svg>
  );
}
