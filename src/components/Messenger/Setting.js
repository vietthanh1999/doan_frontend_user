
let DEBUG = true;
let HOST_URL = "https://homie.herokuapp.com";
let SOCKET_URL = "wss://homie.herokuapp.com";
if (DEBUG) {
  HOST_URL = "http://127.0.0.1:8000";
  SOCKET_URL = "ws://127.0.0.1:8000";
}

export { HOST_URL, SOCKET_URL };