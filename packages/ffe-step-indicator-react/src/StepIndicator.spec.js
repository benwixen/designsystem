import React from 'react';
import { shallow, mount } from 'enzyme';
import StepIndicator from "./StepIndicator";

const steps = [
    {
        heading: 'Næring og formål',
        description: 'Litt om hva dere skal låne til'
    }, {
        heading: 'Regnskap',
        description: 'Driftsinntekt, lønn, varer, utgifter og uregistrerte bevegelser',
    }, {
        heading: 'Oppsummering',
        description: 'Se over og send inn',
    },
];

const getShallowWrapper = props => shallow(<StepIndicator steps={steps} currentStep={1} {...props} />);
const getMountedWrapper = props => mount(<StepIndicator steps={steps} currentStep={1} {...props} />);

describe('<StepIndicator />', () => {
    it('should render without exploding', () => {
        const wrapper = getShallowWrapper();
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('nav')).toBe(true);
    });

    it('should get right number of Steps', () => {
        const wrapper = getShallowWrapper();
        const stepsWrapper = wrapper.find('Step');
        expect(stepsWrapper.length).toEqual(3);
    });

    it('should set visited classes on one of the steps', () => {
        const wrapper = getShallowWrapper();
        const stepsWrapper = wrapper.find('Step');
        const currentSteps = stepsWrapper.map(s => s).filter(step => step.props().state === 'current');
        expect(currentSteps.length).toEqual(1);
        const visitedSteps = stepsWrapper.map(s => s).filter(step => step.props().state === 'visited');
        expect(visitedSteps.length).toEqual(0);
        const notVisitedSteps = stepsWrapper.map(s => s).filter(step => step.props().state === 'not_visited');
        expect(notVisitedSteps.length).toEqual(2);
    });

    it('should set visited classes on two of the steps', () => {
        const wrapper = getShallowWrapper({ currentStep: 2 });
        const stepsWrapper = wrapper.find('Step');
        const currentSteps = stepsWrapper.map(s => s).filter(step => step.props().state === 'current');
        expect(currentSteps.length).toEqual(1);
        const visitedSteps = stepsWrapper.map(s => s).filter(step => step.props().state === 'visited');
        expect(visitedSteps.length).toEqual(1);
        const notVisitedSteps = stepsWrapper.map(s => s).filter(step => step.props().state === 'not_visited');
        expect(notVisitedSteps.length).toEqual(1);
    });

    it('should add className if passed', () => {
        const wrapper = getShallowWrapper({ className: 'test-class' });
        const className = wrapper.prop('className');
        expect(className.includes('test-class')).toBe(true);
    });

    it('should pass props correctly', () => {
        const wrapper = getShallowWrapper({ id: 'test-id' });
        expect(wrapper.prop('id')).toBe('test-id');
    });

    it('should fire onStepClick when the current is clicked', () => {
        let stepClicked;
        const wrapper = getMountedWrapper({
            onStepClick: step => { stepClicked = step; },
        });
        wrapper.find('Step').at(0).simulate('click');
        expect(stepClicked).toEqual(1);
    });

    it('should not respond to clicks on future steps', () => {
        let stepClicked;
        const wrapper = getMountedWrapper({
            onStepClick: step => { stepClicked = step; },
        });
        wrapper.find('Step').at(1).simulate('click');
        expect(stepClicked).toEqual(undefined);
    });

    it('should fire onStepClick when a previous step is clicked', () => {
        let stepClicked;
        const wrapper = getMountedWrapper({
            currentStep: 3,
            onStepClick: step => { stepClicked = step; },
        });
        wrapper.find('Step').at(1).simulate('click');
        expect(stepClicked).toEqual(2);
    });

    it('should respond to clicks on future steps if furthestStep is set, and the step is within that range', () => {
        let stepClicked;
        const wrapper = getMountedWrapper({
            furthestStep: 3,
            onStepClick: step => { stepClicked = step; },
        });
        wrapper.find('Step').at(1).simulate('click');
        expect(stepClicked).toEqual(2);
    });
});
