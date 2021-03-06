import React from 'react';
import { shallow } from 'enzyme';
import BulletList from './BulletList';

const getWrapper = props =>
    shallow(
        <BulletList {...props}>
            <li>Firstly</li>
            <li>Secondly</li>
        </BulletList>,
    );

describe('<BulletList>', () => {
    it('renders without exploding', () => {
        const wrapper = getWrapper();
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.is('ul')).toBe(true);
    });
    it('has the correct class', () => {
        const wrapper = getWrapper({ className: 'test-class' });
        expect(wrapper.hasClass('ffe-bullet-list')).toBe(true);
        expect(wrapper.hasClass('test-class')).toBe(true);
    });
    it('passes props', () => {
        const wrapper = getWrapper({ id: 'that-id' });
        expect(wrapper.prop('id')).toBe('that-id');
        expect(wrapper.text()).toContain('Firstly');
    });
});
