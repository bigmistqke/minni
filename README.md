## simple drag cursor utility

```ts
import {minni} from "@bigmistqke/minni"


const mouseDownHandler = async (e) => {
  console.log('start dragging')
  const delta = await minni(e, (delta) => {
    ...
  })
  console.log('finished dragging:', delta)
}

const touchStartHandler = async (e) => {
  console.log('start dragging')
  const delta = await minni(e, (delta) => {
    ...
  })
  console.log('finished dragging:', delta)
}

```
