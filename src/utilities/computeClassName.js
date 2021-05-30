export function computeClassName(className, defaultClassName) {
  className = className ? `${className} ${defaultClassName}` : defaultClassName;
  return className;
}
