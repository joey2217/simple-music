import mitt from "mitt";

type Events = {
  closeLyric: void;
  time: number;
};

const emitter = mitt<Events>(); // inferred as Emitter<Events>

export default emitter;
