import Ws from "@adonisjs/websocket-client";

import { endPointWs } from './api';

const server = "wss://fiberstreet.dktelecom.net.br";
const local = "ws://192.168.0.100:3333";

export class SocketConnection {
  connect(jwt) {
    this.ws = Ws(endPointWs);
    
    this.ws.withJwtToken(jwt);
    this.ws.connect();

    this.ws.on("open", () => {});

    this.ws.on("close", () => {});
    
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
        // console.log("Incoming", message);
        try {
          handler(message);
        } catch (err) {}
      });

      result.on("error", error => {
        // console.error(error);
      });

      return result;
    }
  }
}

export default new SocketConnection();
