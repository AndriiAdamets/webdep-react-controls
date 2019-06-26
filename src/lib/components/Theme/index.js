import React, { Component, createContext } from 'react';

// TODO: Create default themes
export const themes = {
  default: {
    useBEM: true,
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
    textarea: {
      inputClassName: 'wrc-textarea',
    },
    button: {
      buttonClassName: 'wrc-button',
      sizeLabels: {
        small: 'small',
        medium: 'medium',
        large: 'large',
      },

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