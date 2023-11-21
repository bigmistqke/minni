type CustomMouseEvent = {
    clientX: number;
    clientY: number;
};
type CustomTouchEvent = {
    touches: TouchList;
};
declare const minni: <TEvent extends CustomMouseEvent | CustomTouchEvent>(event: TEvent, callback?: ((delta: {
    x: number;
    y: number;
}, event: TEvent extends CustomTouchEvent ? TouchEvent : MouseEvent) => {}) | undefined) => Promise<{
    x: number;
    y: number;
}>;

export { minni };
