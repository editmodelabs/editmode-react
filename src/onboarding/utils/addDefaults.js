import { DEFAULT_STEP_CONFIG, DEFAULT_FIELD_CONFIG } from "./CONSTANTS";


export const addDefaults = (config) => {
  config.steps = config.steps.map(step => {
    return Object.assign(
      {},
      DEFAULT_STEP_CONFIG,
      step,
      {
        fields: (step.fields || []).map(field => {
          return Object.assign(
            {},
            DEFAULT_FIELD_CONFIG,
            field
          )
        })
      }
    )
  });
  return config;
}
