import React from "react";
import { Steps } from "./Steps";
import { Step } from "./Step";
import { removeContainerElement } from "../utils/removeContainer";

export const renderOnboardingPopup = (config) => (
  <>
    <div
      className="react-onboarding-pro-blur-background full-screen"
      onClick={config.overlayClose ? removeContainerElement : undefined}
    />
    <Steps>
      {config.steps.map((step, index) => (
        <Step step={step} key={index} />
      ))}
    </Steps>
  </>
);
