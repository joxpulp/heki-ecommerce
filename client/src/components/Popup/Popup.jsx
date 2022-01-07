import React from 'react';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

function Popup({ error, children }) {
	return (
		<Box
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			position='fixed'
			top='5'
			left='2'
			p='20px'
			bg={error ? '#FFC7C6' : '#C2FFCE'}
			zIndex={100}
		>
			<Text color={error ? '#98210A' : '#235234'}>{children}</Text>
		</Box>
	);
}

export default Popup;
