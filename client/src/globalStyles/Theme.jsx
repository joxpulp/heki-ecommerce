import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
	colors: {
		primary: '#0D0D0D',
		secondary: '#979797',
		subtext: '#b8b8b8',
	},
	fonts: {
		chakra: `'Chakra Petch', sans-serif`,
		lato: `'Lato', sans-serif`,
	},
};

function Theme({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
