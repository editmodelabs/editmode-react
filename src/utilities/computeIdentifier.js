export function computeIdentifier(identifier) {
  return String(identifier).substring(0, 3) === "prj";
}
