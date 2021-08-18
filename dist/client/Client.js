const socket = io();
const online = document.querySelector("#online");
const offline = document.querySelector("#offline");
const send = document.querySelector("#send");
const text = document.querySelector("#message");
socket.on("connect", () => {
  online.style.display = "";
  offline.style.display = "none";
  console.log(socket.id);

  socket.on("send-message", (message) => {
    console.log(message);
  });
  socket.on("disconnect", () => {
    online.style.display = "none";
    offline.style.display = "";
    console.log("disconnect");
  });

  send.addEventListener("click", () => {
    const message = text.value;
    const payload = {
      id: new Date().getTime(),
      message,
    };

    socket.emit("send-message", payload, (id) => {
      console.log("from user", id);
    });
  });
});
