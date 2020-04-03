const formatValue = value => {
  if (value !== null && typeof value === "object") {
    if (Array.isArray(value)) {
      return value
        .map(v => formatValue(v))
        .filter(v => v !== null)
        .join("; ");
    } else {
      return Object.keys(value)
        .map(key => {
          if (typeof value[key] === "boolean") {
            if (value[key]) {
              return key;
            } else {
              return null;
            }
          }
          return `${key}=${formatValue(value[key])}`;
        })
        .filter(v => v != null)
        .join("; ");
    }
  }
  return value;
};

export const createHeaderFile = headers =>
  headers
    .map(
      ({ ["for"]: path, values }) =>
        `${path}\n${Object.keys(values)
          .map(key => `  ${key}: ${formatValue(values[key])}`)
          .join("\n")}`
    )
    .join("\n");
