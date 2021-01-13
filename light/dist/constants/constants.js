"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIND_REQUEST_MESSAGE = exports.FIND_PORT = exports.FIND_IP = void 0;
exports.FIND_IP = "239.255.255.250";
exports.FIND_PORT = 1982;
exports.FIND_REQUEST_MESSAGE = `M-SEARCH * HTTP/1.1\r\n
    HOST: 239.255.255.250:1982\r\n
    MAN: "ssdp:discover"\r\n
    ST: wifi_bulb\r\n`;
