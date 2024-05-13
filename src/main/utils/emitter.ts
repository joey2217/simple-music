import mitt from 'mitt'

type Events = {
  closeLyric: void
}

const emitter = mitt<Events>() // inferred as Emitter<Events>

export default emitter

// emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'

// emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
