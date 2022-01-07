import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import DescriptionSection from '../../components/DescriptionSection/DescriptionSection';
import GridSection from '../../components/GridSection/GridSection';
import MainBase from '../../components/MainBase/MainBase';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import { getOrderById } from '../../reducers/purchase/purchaseReducer';
import ProductOrderCard from '../ProductOrderCard/ProductOrderCard';

function OrderPage() {
	const { orderId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { orderProducts, totalPaid } = useSelector((state) => state.purchase);

	useEffect(() => {
		dispatch(getOrderById(orderId));
	}, [dispatch, orderId]);

	return (
		<MainBase>
			<DescriptionSection>
				<Title>Order #{orderId}</Title>
				<Text my='10px'>Total in this order: USD {totalPaid}</Text>
				<Text
					cursor='pointer'
					my='10px'
					onClick={() => history.push('/orders')}
				>
					Go back
				</Text>
			</DescriptionSection>
			<GridSection>
				{orderProducts.map((product, index) => (
					<ProductOrderCard
						key={index}
						name={product.name}
						quantity={product.quantity}
						price={product.price}
						thumbnail={product.thumbnail}
					/>
				))}
			</GridSection>
		</MainBase>
	);
}

export default OrderPage;
