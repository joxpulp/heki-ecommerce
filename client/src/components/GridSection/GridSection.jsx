import React from 'react'
import { Section } from '../Section/Section';

function GridSection({children}) {
    return (
			<Section
				flexDirection='column'
				display='grid'
				gridTemplateColumns={[
					'repeat(1, minmax(100px, 1fr))',
					'repeat(2, minmax(100px, 1fr))',
					'repeat(4, minmax(100px, 1fr))',
				]}
				gridGap='30px'
				py='54px'
				px={['20px', '20px', '145px']}
			>
				{children}
			</Section>
		);
}

export default GridSection
