import { render } from "react-dom";
import "./styles/style.css";
import { createContainerElement } from "./utils/createContainer";
import { addDefaults } from "./utils/addDefaults";
import { renderOnboardingPopup } from "./components/renderOnboardingPopup";

export const renderOnboarding = (config) => {
  if (!Array.isArray(config.steps) || !config.steps.length) {
    console.error("Invalid configuration for Onboarding");
  }
  const container = createContainerElement();

  const configWithDefaults = addDefaults(config);
  render(renderOnboardingPopup(configWithDefaults), container);
};

export default renderOnboarding;
