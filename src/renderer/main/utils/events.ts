import mitt from 'mitt';

type Events = {
  play: void
  pause: void
  seek: number
  end: void
};

const emitter = mitt<Events>(); // inferred as Emitter<Events>

export default emitter