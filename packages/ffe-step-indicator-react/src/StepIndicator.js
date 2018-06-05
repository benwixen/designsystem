import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import classNames from 'classnames';
import Step from "./Step";

function getStepState(stepIndex = 1, currentStep = 1, furthestStep = 1) {
    const furthest = Math.max(currentStep, furthestStep);
    if (currentStep === stepIndex) {
        return 'current';
    } else if (stepIndex <= furthest) {
        return 'visited';
    }
    return 'not_visited';
}

function handleStepClick(onStepClick, currentStep = 1, nextStep = 1, furthestStep = 1) {
    const furthest = Math.max(currentStep, furthestStep);
    if (onStepClick && nextStep <= furthest) {
        onStepClick(nextStep);
    }
}

const StepIndicator = ({ className, steps, currentStep, furthestStep, onStepClick, ...rest }) => (
    <nav
        className={classNames(
            'ffe-step-indicator',
            className,
        )}
        {...rest}
    >
        {steps.map((step, i) =>
            <Step
                key={i}
                num={i + 1}
                state={getStepState(i + 1, currentStep, furthestStep)}
                onClick={() => handleStepClick(onStepClick, currentStep, i + 1, furthestStep)}
                {...step}
            />
        )}
    </nav>
);

StepIndicator.propTypes = {
    className: string,
    steps: arrayOf(shape({
        heading: string.isRequired,
        description: string.isRequired,
    })).isRequired,
    /** 1-based index of the current step the user is on. */
    currentStep: number,
    /** 1-based index of the furthest step the user has reached (affects which items are clickable). */
    furthestStep: number,
    onStepClick: func,
};

export default StepIndicator;
