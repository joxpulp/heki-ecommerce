import React from 'react'
import { Box } from '../../components/Box/Box';
import { Image } from '../../components/Image/Image';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';

function ProductOrderCard({name, price, quantity, thumbnail}) {
    return (
			<Box
				overflow='hidden'
				flexDirection='column'
				width='100%'
				borderRadius='5px'
			>
				<Image
					borderRadius='5px'
					width='100%'
					src={thumbnail}
					alt='thumbnailImg'
				/>
				<Title my='15px'>{name}</Title>
				<Text>Product's Qty: {quantity}</Text>
				<Text>USD {price}</Text>
			</Box>
		);
}

export default ProductOrderCard
