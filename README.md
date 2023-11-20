## 🐭 minni, a minimal drag utility

```ts
import {minni} from "@bigmistqke/minni"

const mouseDownHandler = async (e: MouseEvent) => {
  console.log('start dragging')
  const delta = await minni(e, (delta) => {
    ...
  })
  console.log('finished dragging:', delta)
}

const touchStartHandler = async (e: TouchEvent) => {
  console.log('start dragging')
  const delta = await minni(e, (delta) => {
    ...
  })
  console.log('finished dragging:', delta)
}

```
