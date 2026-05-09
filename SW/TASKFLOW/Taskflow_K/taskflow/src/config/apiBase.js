const raw = import.meta.env.VITE_API_URL;
const trimmed = typeof raw === "string" ? raw.trim() : "";

/**
 * REST calls: in dev, empty string = same origin so Vite proxies /api (see vite.config.js).
 * Set VITE_API_URL to an absolute URL only if you skip the proxy (then gateway CORS must allow the UI origin).
 */
export const API_BASE_URL =
  trimmed.length > 0
    ? trimmed.replace(/\/$/, "")
    : import.meta.env.DEV
      ? ""
      : "http://localhost:18080";

const gatewayRaw = import.meta.env.VITE_GATEWAY_URL;
const gatewayTrimmed = typeof gatewayRaw === "string" ? gatewayRaw.trim() : "";

/**
 * SockJS/STOMP base URL. In dev, same-origin + vite proxy → no CORS (see vite.config.js `/notifications`).
 * Override with VITE_GATEWAY_URL if needed.
 */
export const GATEWAY_ORIGIN =
  gatewayTrimmed.length > 0
    ? gatewayTrimmed.replace(/\/$/, "")
    : trimmed.length > 0
      ? trimmed.replace(/\/$/, "")
      : import.meta.env.DEV
        ? ""
        : "http://localhost:18080";
