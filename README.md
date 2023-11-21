## 🐭 minni, a minimal drag utility

```ts
import {minni} from "@bigmistqke/minni"

const mouseDownHandler = async (e: MouseEvent) => {
  console.log('start dragging')
  const delta = await minni(e, (delta, e) => {
    console.log('dragging:', delta)
    console.log('mouse-event:', e)
  })
  console.log('total drag:', delta)
}

const touchStartHandler = async (e: TouchEvent) => {
  console.log('start dragging')
  const delta = await minni(e, (delta, e) => {
    console.log('dragging:', delta)
    console.log('touch-event:', e)
  })
  console.log('total drag:', delta)
}
```
