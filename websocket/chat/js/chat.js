'use strict';

const connection = new WebSocket("wss://neto-api.herokuapp.com/chat");
let messageSubmit = document.querySelector(".message-submit"),
  messageStatus = document.querySelector(".message-status"),
  messagesContent = document.querySelector(".messages-content"),
  messageInput = document.querySelector(".message-input"),
  message = document.querySelectorAll(".message")[1],
  messagePersonal = document.querySelector(".message-personal"),
  loading = document.querySelector(".loading"),
  chatStatus = document.querySelector(".chat-status");

connection.addEventListener("open", () => {
  chatStatus.textContent = chatStatus.dataset.online;
  messageSubmit.disabled = false;
  messageSubmit.addEventListener("click", send);
  messageInput.addEventListener("keyup", press);
  messageStatus.children[0].innerHTML = "Пользователь появился в сети";
  connection.send("Пользователь появился в сети");
  let messagesContent = document.querySelector(".messages-content");
  messagesContent.appendChild(messageStatus);
});

connection.addEventListener("message", event => {
  let date = new Date(),
    messagesContent = document.querySelector(".messages-content"),
    min = date.getMinutes();

  if ((min + "").length === 1) {
    message.children[2].textContent = date.getHours() + ":" + 0 + min;
  } else {
    message.children[2].textContent = date.getHours() + ":" + min;
  }

  if (event.data === "...") {
    loading.children[1].textContent = "Пишет сообщение...";
    messagesContent.appendChild(loading);
  } else {
    if (messagesContent.contains(loading)) {
      messagesContent.removeChild(loading);
    }

    message.children[1].textContent = event.data;

    let clone = message.cloneNode(true);
    messagesContent.appendChild(clone);
  }
});

connection.addEventListener("close", event => {
  chatStatus.textContent = chatStatus.dataset.offline;
  messageSubmit.disabled = true;
  messageStatus.children[0].innerHTML = "Пользователь не в сети";
  connection.send("Пользователь появился в сети");

  let messagesContent = document.querySelector(".messages-content");
  messagesContent.appendChild(messageStatus);
});

function press(event) {
  if (event.keyCode == 13) {
    let messageInput = document.querySelector(".message-input");
    connection.send(messageInput.value);
    let date = new Date(),
      min = date.getMinutes();

    if ((min + "").length === 1) {
      messagePersonal.children[1].textContent = date.getHours() + ":" + 0 + min;
    } else {
      messagePersonal.children[1].textContent = date.getHours() + ":" + min;
    }

    messagePersonal.children[0].textContent = messageInput.value;

    let clone = messagePersonal.cloneNode(true);
    let messagesContent = document.querySelector(".messages-content");
    messagesContent.appendChild(clone);
  }
}

function send(event) {
  event.preventDefault();
  let messageInput = document.querySelector(".message-input");
  connection.send(messageInput.value);
  let date = new Date(),
    messagesContent = document.querySelector(".messages-content"),
    min = date.getMinutes();

  if ((min + "").length === 1) {
    messagePersonal.children[1].textContent = date.getHours() + ":" + 0 + min;
  } else {
    messagePersonal.children[1].textContent = date.getHours() + ":" + min;
  }
  messagePersonal.children[0].textContent = messageInput.value;

  let clone = messagePersonal.cloneNode(true);
  messagesContent.appendChild(clone);
}
