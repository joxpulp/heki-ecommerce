import React from 'react';
import { useSelector } from 'react-redux';
import { CubeSpinner } from 'react-spinners-kit';
import { Box } from '../Box/Box';
import { Main } from '../Main/Main';

function MainBase({ children }) {
	const { loading } = useSelector((state) => state.ui);

	return (
		<Main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			flexDirection='column'
			width='100%'
		>
			{loading ? (
				<Box
					height='80vh'
					alignItems='center'
					justifyContent='center'
				>
					<CubeSpinner size={100} frontColor='#aaaaaa' />
				</Box>
			) : (
				<>{children}</>
			)}
		</Main>
	);
}

export default MainBase;
