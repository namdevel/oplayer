import type { ErrorData, HlsConfig } from 'hls.js'
import Hls from 'hls.js/dist/hls.light.min'
import type { PlayerPlugin } from '../src'

let hlsTnstance: Hls | null = null

const getHls = (options?: Partial<HlsConfig>): Hls => {
  if (hlsTnstance) {
    hlsTnstance.destroy()
  }
  hlsTnstance = new Hls(options)
  return hlsTnstance
}

const hlsPlugin = (config?: Partial<HlsConfig>): PlayerPlugin => ({
  name: 'oplayer-plugin-hls',
  load: ({ on, emit }, video, src: string) => {
    if (!/m3u8(#|\?|$)/i.test(src)) return false
    if (
      video.canPlayType('application/x-mpegURL') ||
      video.canPlayType('application/vnd.apple.mpegURL')
    ) {
      return false
    }

    hlsTnstance = getHls({ autoStartLoad: false, ...config })
    if (!hlsTnstance || !Hls.isSupported()) {
      emit('error', {
        payload: {
          type: 'hlsNotSupported',
          message: 'HLS is not supported'
        }
      })
      return false
    }

    hlsTnstance!.attachMedia(video)
    hlsTnstance!.loadSource(src)
    hlsTnstance.startLoad()

    Object.values(Hls.Events).forEach((e) => {
      hlsTnstance!.on(e as any, (event: string, data: ErrorData) => {
        if (event === Hls.Events.ERROR) {
          emit('error', { type: event, payload: data })
        }
        emit(event, data)
      })
    })

    on('destroy', () => {
      hlsTnstance?.destroy()
      hlsTnstance = null
    })

    return true
  }
})

export default hlsPlugin
