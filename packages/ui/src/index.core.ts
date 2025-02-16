import {
  Player,
  $,
  isMobile,
  isiPad,
  isiPhone,
  isIOS,
  isQQBrowser,
  EVENTS,
  OH_EVENTS,
  PLAYER_EVENTS,
  VIDEO_EVENTS
} from '@oplayer/core'

import ui from './index'

export default Object.assign(
  Player,
  {
    $,

    EVENTS,
    OH_EVENTS,
    VIDEO_EVENTS,
    PLAYER_EVENTS
  },

  //platform:
  {
    isMobile,
    isiPad,
    isiPhone,
    isIOS,
    isQQBrowser
  },
  {
    ui: ui
  }
)

if (globalThis.window) {
  // @ts-ignore
  globalThis.window.OUI = ui
}
