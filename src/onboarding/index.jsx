import React from "react";
import { render } from "react-dom";
import "./styles/style.css";
import { createContainerElement } from "./utils/createContainer";
import { addDefaults } from "./utils/addDefaults";
import { renderOnboardingPopup } from "./components/renderOnboardingPopup.jsx";
import StepOneEC from "./steps/editing/StepOne.jsx";
import StepTwoEC from "./steps/editing/StepTwo.jsx";
import StepThreeEC from "./steps/editing/StepThree.jsx";
import StepFourEC from "./steps/editing/StepFour.jsx";
import StepFiveEC from "./steps/editing/StepFive.jsx";
import StepSixEC from "./steps/editing/StepSix.jsx";

import StepOneCC from "./steps/coreConcepts/StepOne.jsx";
import StepTwoCC from "./steps/coreConcepts/StepTwo.jsx";
import StepThreeCC from "./steps/coreConcepts/StepThree.jsx";
import StepFourCC from "./steps/coreConcepts/StepFour.jsx";
import StepFiveCC from "./steps/coreConcepts/StepFive.jsx";
import StepSixCC from "./steps/coreConcepts/StepSix.jsx";

export const renderOnboarding = (config) => {
  if (!Array.isArray(config.steps) || !config.steps.length) {
    console.error("Invalid configuration for Onboarding");
  }
  const container = createContainerElement();

  const configWithDefaults = addDefaults(config);
  render(renderOnboardingPopup(configWithDefaults), container);
};

export function Onboarding() {
  const OpenOnboarding = () => {
    const config = {
      steps: [
        {
          title: "Welcome to our Quick Editmode Guide",
          description:
            "You'll be shown a few basic Editmode concepts in the next steps.",
        },
        {
          type: "component",
          component: StepOneCC,
        },
        {
          type: "component",
          component: StepTwoCC,
        },
        {
          type: "component",
          component: StepThreeCC,
        },
        {
          type: "component",
          component: StepFourCC,
        },
        {
          type: "component",
          component: StepFiveCC,
        },
        {
          type: "component",
          component: StepSixCC,
        },
        {
          type: "component",
          component: StepOneEC,
        },
        {
          type: "component",
          component: StepTwoEC,
        },
        {
          type: "component",
          component: StepThreeEC,
        },
        {
          type: "component",
          component: StepFourEC,
        },
        {
          type: "component",
          component: StepFiveEC,
        },
        {
          type: "component",
          component: StepSixEC,
        },
      ],
      overlayClose: false,
    };

    renderOnboarding(config);
  };
  return <div>{typeof window !== "undefined" && OpenOnboarding()}</div>;
}
