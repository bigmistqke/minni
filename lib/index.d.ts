declare const minni: <TEvent extends MouseEvent | TouchEvent>(event: TEvent, callback?: ((delta: {
    x: number;
    y: number;
}, event: TEvent) => {}) | undefined) => Promise<{
    x: number;
    y: number;
}>;

export { minni };
