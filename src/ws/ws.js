export default class myWebSocket {
  constructor() {
    this.ws = null;
  }

  connect(url, onMessage, onOpen, onClose) {
    this.ws = new WebSocket(url);

    this.ws.onmessage = onMessage;

    this.ws.onopen = () => {
      if (typeof onOpen === 'function') {
        onOpen();
      }
    }
    this.ws.onclose = () => {
      this.ws = null;

      setTimeout(() => {
        this.connect(url, onMessage, onOpen, onClose);
      }, 1000);

      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }
}
