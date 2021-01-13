export const FIND_IP = "239.255.255.250";
export const FIND_PORT = 1982;

export const FIND_REQUEST_MESSAGE = `M-SEARCH * HTTP/1.1\r\n
    HOST: 239.255.255.250:1982\r\n
    MAN: "ssdp:discover"\r\n
    ST: wifi_bulb\r\n`;
