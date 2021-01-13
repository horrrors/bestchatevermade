"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteLight = void 0;
const buffer_1 = require("buffer");
const dgram_1 = require("dgram");
const constants_1 = require("../constants/constants");
const utils_1 = require("../utils/utils");
const net_1 = require("net");
class RemoteLight {
    constructor() {
        this.initialized = false;
    }
    async codeGreen() {
        const green = "25600";
        await this._startColorFlow(green);
    }
    async codeRed() {
        const red = "16711680";
        await this._startColorFlow(red);
    }
    async setInitialInfo() {
        const rawDeviceResponse = await this._findDevice();
        const deviceResponse = utils_1.parseYellightResponse(rawDeviceResponse);
        const { Location, ...defaultState } = deviceResponse;
        this.remoteAdress = utils_1.parseAddress(Location);
        this.defaultState = defaultState;
        this.connection = await this._createConnection();
        this.initialized = true;
        console.log(this);
    }
    async _findDevice() {
        return new Promise((resolve) => {
            const client = dgram_1.createSocket("udp4");
            client.on("message", (msg) => {
                client.removeAllListeners();
                client.close();
                resolve(msg.toString());
            });
            client.send(buffer_1.Buffer.from(constants_1.FIND_REQUEST_MESSAGE), constants_1.FIND_PORT, constants_1.FIND_IP);
        });
    }
    async _createConnection() {
        return new Promise((resolve) => {
            const client = net_1.createConnection({
                host: this.remoteAdress.IP,
                port: this.remoteAdress.PORT,
            }, () => {
                resolve(client);
            });
        });
    }
    _sendCommand(cmd) {
        if (!this.initialized)
            throw new Error("Remote Light not initialized");
        this.connection.write(JSON.stringify(cmd) + "\r\n");
    }
    _turnOn() {
        const cmd = {
            id: 1,
            method: "set_power",
            params: ["on", "smooth", 500],
        };
        this._sendCommand(cmd);
    }
    _turnOff() {
        const cmd = {
            id: 1,
            method: "set_power",
            params: ["off", "smooth", 500],
        };
        this._sendCommand(cmd);
    }
    _startColorFlow(color) {
        return new Promise((resolve) => {
            if (this.defaultState.power === "off")
                this._turnOn();
            const cmd = {
                id: 2,
                method: "start_cf",
                params: [10, 0, `500,1,${color},1,500,1,${color},100`],
            };
            this._sendCommand(cmd);
            setTimeout(() => {
                if (this.defaultState.power === "off")
                    this._turnOff();
                this.connection.destroy();
                resolve();
            }, 5000);
        });
    }
}
exports.RemoteLight = RemoteLight;
