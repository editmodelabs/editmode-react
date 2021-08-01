export function toBase64(str) {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  } else {
    return window.btoa(str);
  }
}
