import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '../../components/Box/Box';
import { Image } from '../../components/Image/Image';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import { removeProductCart } from '../../reducers/cart/cartReducer';

const CartCard = ({ name, price, thumbnail, productId, quantity }) => {
	const dispatch = useDispatch();

	return (
		<Box
			py='30px'
			overflow='hidden'
			width={['100%', '100%', '80%']}
			borderBottom='1px solid black'
		>
			<Image
				borderRadius='5px'
				width={['30%', '30%', '25%']}
				src={thumbnail}
				alt='productImg'
			/>
			<Box mx={['10px', '10px', '30px']} flexDirection='column'>
				<Title fontSize={['16px', '16px', '24px']}>{name}</Title>
				<Text my='15px'>USD {price}</Text>
				<Text>Quantity: {quantity}</Text>
			</Box>
			<Box flex={1} justifyContent='end' alignItems='end'>
				<Text
					onClick={() => dispatch(removeProductCart(productId))}
					cursor='pointer'
				>
					Remove
				</Text>
			</Box>
		</Box>
	);
};

export default CartCard;
