import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../reducers/products/productsReducer';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import MainBase from '../../components/MainBase/MainBase';
import DescriptionSection from '../../components/DescriptionSection/DescriptionSection';
import GridSection from '../../components/GridSection/GridSection';
import ProductCard from '../ProductCard/ProductCard';
import NoResults from '../../components/NoResults/NoResults';
import { getCart } from '../../reducers/cart/cartReducer';

function ShopPage() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProducts());
		dispatch(getCart());
	}, [dispatch]);

	if (products.length === 0) {
		return <NoResults>No products in db</NoResults>;
	}

	return (
		<MainBase>
			<DescriptionSection>
				<Title>Shop Tech</Title>
				<Text my='10px'>
					Everything you want, everything fresh and new be always updated with
					latest releases
				</Text>
			</DescriptionSection>
			<GridSection>
				{products.map((product) => (
					<ProductCard
						key={product._id}
						name={product.name}
						price={product.price}
						thumbnail={product.thumbnail}
						id={product._id}
						stock={product.stock}
					/>
				))}
			</GridSection>
		</MainBase>
	);
}

export default ShopPage;
