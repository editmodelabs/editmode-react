import React, { useState } from "react";
import { removeContainerElement } from "../utils/removeContainer";

const cn = (...args) => args.filter(Boolean).join(" ");

export const OnboardingStep = ({
  step,
  isActive,
  displayNext,
  goToNextStep,
  displayFinish,
  goToPreviousStep,
  displayPrevious,
}) => {
  // const router = useRouter();
  const validateFields = () => {
    return !step.fields.reduce((valid, field) => {
      if (!field.validation) {
        return valid & true;
      }
      return valid & RegExp(field.validation, "gm").test(field.value);
    }, true);
  };

  let defaultButtonState = false,
    onSubmitCallback = () => {
      // This function will be replaced by a custom function
    };
  if (step.type === "form") {
    defaultButtonState = step.fields.length === 0 ? false : validateFields();
  } else if (step.type === "component") {
    defaultButtonState = true;
  }

  const [form, setForm] = useState(
    Object.assign(
      {},
      {
        invalid: defaultButtonState,
      },
      ...step.fields.map((field) => ({ [field.name]: field.value || "" }))
    )
  );

  if (!isActive) return null;

  const finito = () => {
    removeContainerElement();
    // router?.push("/");
  };

  let buttonText, buttonFunction;
  if (displayFinish) {
    buttonText = "Finish";
    buttonFunction = finito;
  } else if (displayNext) {
    buttonText = "Next";
    buttonFunction = goToNextStep;
  }
  if (step.type === "form" && step.onSubmit) {
    const defaultButtonFunction = buttonFunction;
    buttonFunction = () => {
      if (form.invalid) {
        return;
      }
      const { invalid, ...formData } = form;
      step.onSubmit(formData);
      defaultButtonFunction();
    };
  } else if (step.type === "component") {
    const defaultButtonFunction = buttonFunction;
    buttonFunction = () => {
      if (onSubmitCallback) {
        onSubmitCallback();
      }
      defaultButtonFunction();
    };
  }

  const validateForm = (name, value) => {
    const validation = step.fields.reduce((data, field) => {
      if (!field.validation) {
        return data & true;
      }
      if (field.name === name) {
        return data & RegExp(field.validation, "gm").test(value);
      }
      return data & RegExp(field.validation, "gm").test(form[field.name]);
    }, true);
    // Valid
    return !validation;
  };

  let updateForm;
  if (step.type === "form") {
    updateForm = (event) => {
      const { name, value } = event.target;
      setForm({
        ...form,
        [name]: value,
        invalid: validateForm(name, value),
      });
    };
  }

  const setButtonState = (state) => {
    setForm({
      ...form,
      invalid: state,
    });
  };

  let CustomComponent = null;
  if (step.type === "component" && step.component) {
    CustomComponent = step.component;
  }

  const setOnSubmit = (onSubmit) => {
    onSubmitCallback = onSubmit;
  };

  return (
    <div className="rop-step">
      {step.title && <div className="rop-title">{step.title}</div>}
      {step.description && (
        <div className="rop-description">{step.description}</div>
      )}
      {step.type === "form" && (
        <form className="rop-form">
          {step.fields.map((field, index) => (
            <div className="rop-input-container" key={field.name + index}>
              {field.label && (
                <label className="rop-input-label" htmlFor={field.name}>
                  {field.label}
                </label>
              )}
              <input
                className="rop-input"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={updateForm}
                value={form[field.name]}
              />
            </div>
          ))}
        </form>
      )}
      {CustomComponent && (
        <CustomComponent
          disable={form.invalid}
          setButtonState={setButtonState}
          setOnSubmit={setOnSubmit}
          {...step.props}
        />
      )}
      <div className={`rop-button-container flex space-between`}>
        <button
          className={cn(
            `rop-button-2 border border-gray-300 hover:bg-gray-50 text-gray-700`,
            !displayPrevious && "invisible"
          )}
          onClick={goToPreviousStep}
          disabled={!displayPrevious}
        >
          Previous
        </button>
        <button
          className="rop-button"
          onClick={buttonFunction}
          disabled={false}
        >
          {!displayFinish ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};
