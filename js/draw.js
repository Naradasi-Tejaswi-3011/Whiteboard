let isDrawing = false;

// Mouse events
board.addEventListener("mousedown", function (e) {
  startDrawing(e.clientX, e.clientY);
});

board.addEventListener("mousemove", function (e) {
  if (isDrawing) draw(e.clientX, e.clientY);
});

board.addEventListener("mouseup", function () {
  stopDrawing();
});

// Touch events
board.addEventListener("touchstart", function (e) {
  const touch = e.touches[0]; // Get the first touch point
  startDrawing(touch.clientX, touch.clientY);
});

board.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];
  if (isDrawing) draw(touch.clientX, touch.clientY);
  e.preventDefault(); // Prevent scrolling while drawing
});

board.addEventListener("touchend", function () {
  stopDrawing();
});

// Drawing functions
function startDrawing(x, y) {
  const top = getLocation();
  ctx.beginPath();
  ctx.moveTo(x, y - top);
  isDrawing = true;

  const point = {
    x,
    y: y - top,
    identifier: "mousedown",
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };

  undoStack.push(point);
  socket.emit("mousedown", point);
}

function draw(x, y) {
  const top = getLocation();
  ctx.lineTo(x, y - top);
  ctx.stroke();

  const point = {
    x,
    y: y - top,
    identifier: "mousemove",
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };

  undoStack.push(point);
  socket.emit("mousemove", point);
}

function stopDrawing() {
  isDrawing = false;
}
