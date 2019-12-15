import { computed } from '@vue/composition-api'

export default function extractOtherListerners(ctx, exceptThese) {
  return computed(() =>
    Object.keys(ctx.listeners).reduce((acc, key) => {
      if (exceptThese.every(listenerName => listenerName !== key))
        acc[key] = ctx.listeners[key]

      return acc
    }, {})
  )
}
