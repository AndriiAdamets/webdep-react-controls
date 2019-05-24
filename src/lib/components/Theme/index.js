import React, { Component, createContext } from 'react';

// TODO: Create default themes
export const themes = {
  default: {
    table: {
      ascButtonContent: '↑',
      descButtonContent: '↓',
      noDirectionButtonContent: '↕',
    },
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