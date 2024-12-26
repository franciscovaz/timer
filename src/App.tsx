import { ThemeProvider } from 'styled-components';

import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <p>Testing themes with styled components</p>

      <GlobalStyle />
    </ThemeProvider>
  )
}