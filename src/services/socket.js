import Ws from "@adonisjs/websocket-client";

export class SocketConnection {
  connect() {
    this.ws = Ws("ws://192.168.0.104:3333").connect();

    this.ws.on("open", () => {
      console.log("Connection initialized");
      // alert("desgraça");
    });

    this.ws.on("close", () => {
      console.log("Connection closed");
    });
    // this.subscribeCto();
    // this.subscribeCables();
    return this;
  }

  subscribeCto() {
    if (!this.ws) {
      setTimeout(() => this.subscribeCto("ctos"), 1000);
    } else {
      const ctos = this.ws.subscribe("ctos");

      ctos.on("message", message => {
        alert("VdAIdfNOdU" + JSON.stringify(message));
      });
      ctos.on("error", error => {
        console.error(error);
      });

      return ctos;
    }
  }

  subscribeCables() {
    if (!this.ws) {
      setTimeout(() => this.subscribeCto("cables"), 1000);
    } else {
      const cables = this.ws.subscribe("cables");

      cables.on("message", message => {
        alert("VAIT OMARNOCU" + JSON.stringify(message));
      });
      cables.on("error", error => {
        console.error(error);
      });

      return cables;
    }
  }

  subscribe(channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000);
    } else {
      const result = this.ws.subscribe(channel);

      result.on("message", message => {
        console.log("Incoming", message);
        handler(message);
      });

      result.on("error", error => {
        console.error(error);
      });

      return result;
    }
  }
}

export default new SocketConnection();
