import React from 'react';
import {string, bool, func} from 'prop-types';
import uuid from 'uuid';

import i18n from './i18n/i18n';

export default class PhoneNumber extends React.Component {

    numberId = uuid.v4();
    countryCodeId = uuid.v4();

    render() {
        const {
            number,
            countryCode,
            onCountryCodeChange,
            onNumberChange,
            onCountryCodeBlur,
            onNumberBlur,
            disabled,
            countryCodeInvalid,
            numberInvalid,
            className
        } = this.props;

        const supportedLocales = ['nb', 'nn', 'en'];
        const text = i18n[supportedLocales.indexOf(this.props.locale) !== -1 ? this.props.locale : 'nb'];

        return (
            <div className={`ffe-input-group ${className ? className : ''}`}>
                <div className="ffe-phone-number">
                    <div className="ffe-phone-number__country-code">
                        <label className="ffe-form-label" htmlFor={this.countryCodeId}>{text.COUNTRY_CODE}</label>
                        <div className="ffe-phone-number__input-group">
                            <span className="ffe-phone-number__plus">+</span>
                            <input
                                id={this.countryCodeId}
                                className="ffe-input-field ffe-phone-number__country-code-input"
                                type="tel"
                                disabled={disabled}
                                value={countryCode}
                                aria-invalid={countryCodeInvalid}
                                onChange={onCountryCodeChange}
                                onBlur={onCountryCodeBlur}
                            />
                        </div>
                    </div>
                    <div className="ffe-phone-number__number">
                        <label className="ffe-form-label" htmlFor={this.numberId}>{text.PHONE_NUMBER}</label>
                        <input
                            id={this.numberId}
                            type="tel"
                            className="ffe-input-field ffe-phone-number__phone-input"
                            onChange={onNumberChange}
                            onBlur={onNumberBlur}
                            value={number}
                            aria-invalid={numberInvalid}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const noop = () => {
};

PhoneNumber.propTypes = {
    number: string,
    countryCode: string,
    onCountryCodeChange: func,
    onNumberChange: func,
    onCountryCodeBlur: func,
    onNumberBlur: func,
    locale: string,
    disabled: bool,
    countryCodeInvalid: bool,
    numberInvalid: bool,
    className: string
};

PhoneNumber.defaultProps = {
    countryCode: '47',
    locale: 'nb',
    onCountryCodeChange: noop,
    onNumberChange: noop,
    onCountryCodeBlur: noop,
    onNumberBlur: noop
};
