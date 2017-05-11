import React from 'react';
import { func, string, arrayOf} from 'prop-types';
import BaseSelector from './base-selector';
import AccountSuggestionMulti from '../account/account-suggestion-multi';
import AccountNoMatch from '../account/account-nomatch';
import { Account, Locale, KeyCodes } from '../util/types';
import { accountFilter } from '../filter/filters';
import StatusBar from '../suggestion/suggestion-list-status-bar';
import txt from '../i18n/i18n';

class AccountSelectorMulti extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {
      suggestionListHeight: 0
    };
  }

  renderSuggestion(account) {
    const { locale, selectedAccounts } = this.props;
    const isSelected = selectedAccounts.filter(a => a.accountNumber === account.accountNumber);
    return (
      <AccountSuggestionMulti
        account={account}
        locale={locale}
        selected={isSelected.length > 0}
      />
    );
  }

  onBlur() {
    if (!this.shouldShowSuggestions) {
      this.props.onBlur();
    }
    this.baseRef.showOrHideSuggestions(this.shouldShowSuggestions);
    this.shouldShowSuggestions = false;
  }

  onDone() {
    this.baseRef.showOrHideSuggestions(false);
    this.props.onBlur();
  }

  renderSuggestionDetails(listHeight) {
    if (this.baseRef) {
      let statusText;
      const { selectedAccounts } = this.props;
      if (selectedAccounts.length === 0) {
        statusText = txt[this.props.locale].NO_ACCOUNTS_SELECTED;
      } else if (selectedAccounts === 1) {
        statusText = txt[this.props.locale].ONE_ACCOUNT_SELECTED;
      } else {
        statusText = `${selectedAccounts.length} ${txt[this.props.locale].MULTIPLE_ACCOUNTS_SELECTED}`;
      }
      const height = listHeight + this.baseRef.getInputHeight();
      return (
        <StatusBar
          renderSelectionStatus={() => statusText}
          onDone={() => this.onDone()}
          labelDoneButton={txt[this.props.locale].DROPDOWN_MULTISELECT_DONE}
          style={{ position: 'absolute', zIndex: 100, top: height }}
        />
      );
    }
    return null;
  }

  onKeyDown(event) {
    if (event.which === KeyCodes.TAB) {
      this.shouldShowSuggestions = !event.shiftKey;
    }
  }


  render() {
    const { noMatches, onAccountSelected, accounts, locale } = this.props;
    return (
      <div
        className='ffe-account-selector'
        onKeyDown={this.onKeyDown}
      >
        <BaseSelector
          renderSuggestion={(account) => this.renderSuggestion(account)}
          renderNoMatches={() => <AccountNoMatch value={noMatches} locale={locale}/>}
          suggestionDetails={this.renderSuggestionDetails()}
          shouldHideSuggestionsOnSelect={false}
          shouldSelectHighlightedOnTab={false}
          shouldHideSuggestionsOnBlur={false}
          shouldHideSuggestionsOnReset={true}
          suggestionFilter={accountFilter}
          onSelect={onAccountSelected}
          onSuggestionListChange={(height) => {
            this.setState({ suggestionListHeight: height });
          }}
          suggestions={accounts}
          ref={(element) => {
            this.baseRef = element;
          }}
          {...this.props}
          onBlur={(e) => this.onBlur(e)}
        />
        {this.state.suggestionListHeight > 0 && this.renderSuggestionDetails(this.state.suggestionListHeight)}
      </div>
    );
  }
}

AccountSelectorMulti.propTypes = {
  onAccountSelected: func.isRequired,
  accounts: arrayOf(Account),
  locale: Locale.isRequired,
  selectedAccounts: arrayOf(Account),
  noMatches: string,
  onBlur: func.isRequired
};

export default AccountSelectorMulti;
