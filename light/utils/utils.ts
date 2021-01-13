import { YellightResponse } from "interfaces/YellightResponse.interface";
import { RemoteAddress } from "../interfaces/RemoteAddress.interface";
import { YellightState } from "../interfaces/YellightState.interface";

export const parseYellightResponse = (res: string) => {
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

const toYellightState = (parsedResponse): YellightResponse => {
  const {
    Location,
    power,
    bright,
    color_mode,
    ct,
    rgb,
    hue,
    sat,
  } = parsedResponse;
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

export const parseAddress = (rawAddress: string): RemoteAddress => {
  const regExp = /^yeelight:\/\/([0-9.]*):([0-9]*)/g;
  const address = regExp.exec(rawAddress);
  return {
    IP: address[1],
    PORT: +address[2],
  };
};
