type CustomMouseEvent = { clientX: number; clientY: number };
type CustomTouchEvent = { touches: TouchList };

export const minni = <TEvent extends CustomMouseEvent | CustomTouchEvent>(
  event: TEvent,
  callback?: (
    delta: { x: number; y: number },
    event: TEvent extends CustomTouchEvent ? TouchEvent : MouseEvent,
  ) => {},
) =>
  new Promise<{ x: number; y: number }>((resolve) => {
    if ('touches' in event) {
      const start = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };

      const getDelta = (event: TouchEvent) => ({
        x: event.touches[0].clientX - start.x,
        y: start.y - event.touches[0].clientY,
      });

      const move = (event: TouchEvent) => callback?.(getDelta(event), event as any);
      const end = (event: TouchEvent) => {
        window.removeEventListener('touchmove', move);
        window.removeEventListener('touchend', end);
        resolve(getDelta(event));
      };

      window.addEventListener('touchmove', move);
      window.addEventListener('touchend', end);
    } else {
      const start = {
        x: event.clientX,
        y: event.clientY,
      };

      const getDelta = (event: MouseEvent) => ({
        x: event.clientX - start.x,
        y: start.y - event.clientY,
      });

      const move = (event: MouseEvent) => callback?.(getDelta(event), event as any);
      const end = (event: MouseEvent) => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', end);
        resolve(getDelta(event));
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', end);
    }
  });
