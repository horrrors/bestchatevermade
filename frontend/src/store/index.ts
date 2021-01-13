import { namespaced } from 'overmind/config'
import * as dialogs from './dialogs'
import * as auth from './auth'
import { createHook, createActionsHook } from 'overmind-react'

// import * as admin from './admin'

import { IConfig } from 'overmind'


declare module 'overmind' {
  // tslint:disable:interface-name
  interface Config extends IConfig<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
  }> { }
  // Due to circular typing we have to define an
  // explicit typing of state, actions and effects since
  // TS 3.9
}

export const config = namespaced({
  dialogs,
  auth
})
declare module 'overmind' {
  interface Config extends IConfig<typeof config> { }
}

export const useOvermind = createHook<typeof config>()
// export const useState = createStateHook<typeof config>()
export const useActions = createActionsHook<typeof config>()
// export const useEffects = createEffectsHook<typeof config>()
// export const useReaction = createReactionHook<typeof config>()
