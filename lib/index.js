const minni = (event, callback) => new Promise((resolve) => {
  if ("touches" in event) {
    const start = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
    const getDelta = (event2) => ({
      x: event2.touches[0].clientX - start.x,
      y: start.y - event2.touches[0].clientY
    });
    const move = (event2) => callback?.(getDelta(event2), event2);
    const end = (event2) => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
      resolve(getDelta(event2));
    };
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  } else {
    const start = {
      x: event.clientX,
      y: event.clientY
    };
    const getDelta = (event2) => ({
      x: event2.clientX - start.x,
      y: start.y - event2.clientY
    });
    const move = (event2) => callback?.(getDelta(event2), event2);
    const end = (event2) => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      resolve(getDelta(event2));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  }
});
export {
  minni
};
