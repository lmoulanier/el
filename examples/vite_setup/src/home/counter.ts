import { computed, signal } from "alien-deepsignals"
import { el } from "@lmoulanier/el/alien-deepsignals"

export function createCounter() {
  const count = signal(0)
  return el('button', {
      id: 'counter',
      type: 'button',
      onclick: () => count.set(count.get() + 1)
  }, computed(() => `count is ${count.get()}`))
}
