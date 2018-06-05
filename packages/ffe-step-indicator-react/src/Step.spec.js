import React from 'react';
import { shallow } from 'enzyme';
import Step from "./Step";
import sinon from 'sinon';

const getWrapper = props => shallow(
    <Step heading="Overskrift" description="En beskrivelse" num={3} state="visited" {...props} />
);

describe('<Step />', () => {
    it('renders without exploding', () => {
        const wrapper = getWrapper();
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('div')).toBe(true);
    });

    it('should set visited class if state is "visited"', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('.ffe-step--visited').exists()).toBe(true);
    });

    it('should not set visited class if state is "not_visited"', () => {
        const wrapper = getWrapper({ state: 'not_visited' });
        expect(wrapper.find('.ffe-step--visited').exists()).toBe(false);
    });

    it('should render the title', () => {
       const wrapper = getWrapper();
       expect(wrapper.find('.ffe-step__heading').text()).toBe('Overskrift');
    });

    it('should render the description', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('.ffe-step__description').text()).toBe('En beskrivelse');
    });

    it('should render the number', () => {
        const wrapper = getWrapper();
        expect(wrapper.find('.ffe-step__number').text()).toBe('3');
    });

    it('should fire onClick event', () => {
        const onClick = sinon.spy();
        const wrapper = getWrapper({ onClick });
        wrapper.simulate('click');
        expect(onClick.calledOnce).toBe(true);
    });
});
