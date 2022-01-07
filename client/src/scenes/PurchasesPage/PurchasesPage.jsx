import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../reducers/purchase/purchaseReducer';
import { Title } from '../../components/Title/Title';
import { Text } from '../../components/Text/Text';
import MainBase from '../../components/MainBase/MainBase';
import DescriptionSection from '../../components/DescriptionSection/DescriptionSection';
import GridSection from '../../components/GridSection/GridSection';
import PurchaseCard from '../PurchaseCard/PurchaseCard';
import NoResults from '../../components/NoResults/NoResults';

function PurchasesPage() {
	const dispatch = useDispatch();
	const { orders } = useSelector((state) => state.purchase);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	if (orders.length === 0) {
		return <NoResults>You dont have any orders generated</NoResults>;
	}

	return (
		<MainBase>
			<DescriptionSection>
				<Title>Your Orders</Title>
				<Text my='10px'>Your history of orders in one place</Text>
			</DescriptionSection>
			<GridSection>
				{orders.map((order, index) => (
					<PurchaseCard
						key={index}
						total={order.total}
						state={order.state}
						productCount={order.purchases.length}
						orderId={order._id}
					/>
				))}
			</GridSection>
		</MainBase>
	);
}

export default PurchasesPage;
