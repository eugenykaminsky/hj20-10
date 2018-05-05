'use strict';

window.addEventListener("click", circles);

let socket = new WebSocket("wss://neto-api.herokuapp.com/mouse");

showBubbles(socket);

function circles(event) {
  let obj = {
    x: event.clientX,
    y: event.clientY
  };
  socket.send(JSON.stringify(obj));
}
