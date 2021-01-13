import { Buffer } from "buffer";
import { createSocket } from "dgram";
import { RemoteAddress } from "../interfaces/RemoteAddress.interface";
import {
  FIND_REQUEST_MESSAGE,
  FIND_IP,
  FIND_PORT,
} from "../constants/constants";
import { YellightState } from "../interfaces/YellightState.interface";
import { parseAddress, parseYellightResponse } from "../utils/utils";
import { Socket, createConnection } from "net";
import { Command } from "interfaces/Command.interface";

export class RemoteLight {
  private defaultState: YellightState;
  private remoteAdress: RemoteAddress;
  private connection: Socket;
  private initialized: Boolean = false;

  public async codeGreen() {
    const green = "25600";
    await this._startColorFlow(green);
  }

  public async codeRed() {
    const red = "16711680";
    await this._startColorFlow(red);
  }

  public async setInitialInfo(): Promise<void> {
    const rawDeviceResponse = await this._findDevice();
    const deviceResponse = parseYellightResponse(rawDeviceResponse);
    const { Location, ...defaultState } = deviceResponse;

    this.remoteAdress = parseAddress(Location);
    this.defaultState = defaultState;
    this.connection = await this._createConnection();
    this.initialized = true;

    console.log(this);
  }

  private async _findDevice(): Promise<string> {
    return new Promise((resolve) => {
      const client = createSocket("udp4");

      client.on("message", (msg) => {
        client.removeAllListeners();
        client.close();
        resolve(msg.toString());
      });

      client.send(Buffer.from(FIND_REQUEST_MESSAGE), FIND_PORT, FIND_IP);
    });
  }

  private async _createConnection(): Promise<Socket> {
    return new Promise((resolve) => {
      const client = createConnection(
        {
          host: this.remoteAdress.IP,
          port: this.remoteAdress.PORT,
        },
        () => {
          resolve(client);
        }
      );
    });
  }

  private _sendCommand(cmd: Command) {
    if (!this.initialized) throw new Error("Remote Light not initialized");
    this.connection.write(JSON.stringify(cmd) + "\r\n");
  }

  private _turnOn() {
    const cmd: Command = {
      id: 1,
      method: "set_power",
      params: ["on", "smooth", 500],
    };
    this._sendCommand(cmd);
  }

  private _turnOff() {
    const cmd: Command = {
      id: 1,
      method: "set_power",
      params: ["off", "smooth", 500],
    };
    this._sendCommand(cmd);
  }

  private _startColorFlow(color): Promise<void> {
    return new Promise((resolve) => {
      if (this.defaultState.power === "off") this._turnOn();

      const cmd: Command = {
        id: 2,
        method: "start_cf",
        params: [10, 0, `500,1,${color},1,500,1,${color},100`],
      };

      this._sendCommand(cmd);

      setTimeout(() => {
        if (this.defaultState.power === "off") this._turnOff();
        this.connection.destroy();
        resolve();
      }, 5000);
    });
  }
}
