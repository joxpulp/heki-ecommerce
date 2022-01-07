import React from 'react'
import { Box } from '../Box/Box';
import { Section } from '../Section/Section';

function DescriptionSection({children}) {
    return (
			<Section bg='black' color='white' height='216px' width='100%'>
				<Box
					flexDirection='column'
					justifyContent='center'
					mx={['20px', '20px', '145px']}
				>
					{children}
				</Box>
			</Section>
		);
}

export default DescriptionSection
