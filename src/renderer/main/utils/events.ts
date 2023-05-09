import mitt from 'mitt'

type Events = {
  play: void
  pause: void
  seek: number
  end?: boolean
  timeUpdate: number
  musicControl: 'prev' | 'play' | 'pause' | 'next'
}

const emitter = mitt<Events>() // inferred as Emitter<Events>

export default emitter
