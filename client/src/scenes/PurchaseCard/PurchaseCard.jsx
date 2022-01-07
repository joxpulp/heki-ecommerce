import React from 'react';
import { Box } from '../../components/Box/Box';
import { Image } from '../../components/Image/Image';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import completeImg from '../../services/svg/order.svg';
import generatedImg from '../../services/svg/generated.svg';
import { useHistory } from 'react-router-dom';
import { clearOrder } from '../../reducers/purchase/purchaseReducer';
import { useDispatch } from 'react-redux';
import { clearErrorMsg } from '../../reducers/ui/uiReducer';

function PurchaseCard({ total, state, productCount, orderId }) {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleClick = () => {
		history.push(`/order/${orderId}`);
		dispatch(clearOrder());
		dispatch(clearErrorMsg());
	};

	return (
		<Box
			overflow='hidden'
			flexDirection='column'
			width='100%'
			borderRadius='5px'
			onClick={handleClick}
			cursor='pointer'
		>
			<Image
				bg='#F6F7FB'
				borderRadius='5px'
				width='100%'
				src={state === 'generated' ? generatedImg : completeImg}
				alt='orderImg'
			/>
			<Title my='15px'> State: {state}</Title>
			<Text>Product's Qty: {productCount}</Text>
			<Text>Total: USD {total}</Text>
		</Box>
	);
}

export default PurchaseCard;
