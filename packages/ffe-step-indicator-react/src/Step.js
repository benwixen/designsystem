import React from 'react';
import { func, number, oneOf, string } from 'prop-types';
import classNames from 'classnames';
import HakeIkon from '@sb1/ffe-icons-react/lib/hake-ikon';

const Step = ({ num, heading, description, state, onClick }) => (
    <div
        className={classNames(
            'ffe-step',
            { 'ffe-step--visited': state === 'visited' },
            { 'ffe-step--current': state === 'current' },
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
    >
        <div className="ffe-step__content">
            <div className="ffe-step__top">
                <span className="ffe-step__bullet">
                    <HakeIkon className="ffe-step__icon" />
                    <span className="ffe-step__number">{num}</span>
                </span>
                <span className="ffe-step__line" />
            </div>
            <div className="ffe-step__heading">{heading}</div>
            <div className="ffe-step__description">{description}</div>
        </div>
    </div>
);

Step.propTypes = {
    heading: string.isRequired,
    description: string.isRequired,
    num: number.isRequired,
    state: oneOf(['visited', 'current', 'not_visited']),
    onClick: func,
};

export default Step;
