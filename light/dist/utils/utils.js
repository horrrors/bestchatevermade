"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAddress = exports.parseYellightResponse = void 0;
const parseYellightResponse = (res) => {
    const regExp = /(\w+):[\s]*([/a-zA-Z0-9.\s:]*)\r$/m;
    const parsedResponse = {};
    res
        .split("\n")
        .splice(1)
        .map((line) => regExp.exec(line))
        .filter((line) => !!line)
        .forEach(([_, key, value]) => {
        parsedResponse[key] = value;
    });
    return toYellightState(parsedResponse);
};
exports.parseYellightResponse = parseYellightResponse;
const toYellightState = (parsedResponse) => {
    const { Location, power, bright, color_mode, ct, rgb, hue, sat, } = parsedResponse;
    return {
        Location,
        power,
        bright,
        color_mode,
        ct,
        rgb,
        hue,
        sat,
    };
};
const parseAddress = (rawAddress) => {
    const regExp = /^yeelight:\/\/([0-9.]*):([0-9]*)/g;
    const address = regExp.exec(rawAddress);
    return {
        IP: address[1],
        PORT: +address[2],
    };
};
exports.parseAddress = parseAddress;
