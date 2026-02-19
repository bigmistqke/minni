const isTouch = (event: any): event is TouchEvent => event instanceof TouchEvent;
const isPointer = (event: any): event is PointerEvent => event instanceof PointerEvent;

export const minni = <TEvent extends TouchEvent | PointerEvent | MouseEvent>(
  event: TEvent,
  callback?: (delta: { x: number; y: number }, event: TEvent) => {},
) =>
  new Promise<{ x: number; y: number }>((resolve) => {
    const start = isTouch(event)
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : { x: event.clientX, y: event.clientY };

    const [moveType, endType]: [string, string] = isTouch(event as Event)
      ? ['touchmove', 'touchend']
      : isPointer(event as Event)
      ? ['pointermove', 'pointerup']
      : ['mousemove', 'mouseup'];

    const getPosition = (event: Event) =>
      isTouch(event)
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };

    const getDelta = (event: Event) => {
      const pos = getPosition(event);
      return { x: pos.x - start.x, y: start.y - pos.y };
    };

    const controller = new AbortController();
    const { signal } = controller;

    if (callback) {
      window.addEventListener(
        moveType,
        (event: Event) => {
          callback(getDelta(event), event as any);
        },
        { signal },
      );
    }
    window.addEventListener(
      endType,
      (event: Event) => {
        controller.abort();
        resolve(getDelta(event));
      },
      { signal },
    );
  });
