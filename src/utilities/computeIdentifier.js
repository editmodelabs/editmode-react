export function computeIdentifier(identifier) {
  return String(identifier).substring(0, 4) === "prj_";
}
