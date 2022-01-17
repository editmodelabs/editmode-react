import React from "react";
import { OnboardingSteps } from "./OnboardingSteps.jsx";
import { OnboardingStep } from "./OnboardingStep.jsx";
import { removeContainerElement } from "../utils/removeContainer";

export const renderOnboardingPopup = (config) => (
  <>
    <div
      className="react-onboarding-pro-blur-background full-screen"
      onClick={config.overlayClose ? removeContainerElement : undefined}
    />
    <OnboardingSteps>
      {config.steps.map((step, index) => (
        <OnboardingStep step={step} key={index} />
      ))}
    </OnboardingSteps>
  </>
);
