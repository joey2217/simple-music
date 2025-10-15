import mitt from "mitt";

type Events = {
  closeLyric: void;
  time: number;
  play: void;
  pause: void;
};

const emitter = mitt<Events>(); // inferred as Emitter<Events>

export default emitter;
