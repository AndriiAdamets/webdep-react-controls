import React, { Component, createContext } from 'react';

// TODO: Create default themes
export const themes = {
  default: {
    table: {
      ascButtonContent: '↑',
      descButtonContent: '↓',
      noDirectionButtonContent: '↕',
      tableClassName: 'wrc-table',
      theadClassName: 'wrc-table__header',
      tbodyClassName: 'wrc-table__body',
      thClassName: 'wrc-table__cell wrc-table__cell--header',
      tdClassName: 'wrc-table__cell',
      trClassName: 'wrc-table__row',
    },
    input: {
      inputClassName: 'wrc-input',
    },
    button: {
      buttonClassName: 'wrc-button',
    },
    card: {
      className: 'wrc-card',
      headerClassName: 'wrc-card__header',
      bodyClassName: 'wrc-card__body',
    }
  },
};

export const WRCThemeContext = createContext({theme: themes.default});

export class WRCThemeProvider extends Component {
  render() {
    const { theme, children, } = this.props;

    return (
      <WRCThemeContext.Provider value={{theme}}>
        {children}
      </WRCThemeContext.Provider>
    );
  }
}