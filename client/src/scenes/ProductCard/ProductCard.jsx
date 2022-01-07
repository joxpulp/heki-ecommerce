import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box } from '../../components/Box/Box';
import { Image } from '../../components/Image/Image';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import { clearProduct } from '../../reducers/products/productsReducer';
import { clearErrorMsg } from '../../reducers/ui/uiReducer';
import { AnimatePresence } from 'framer-motion';

function ProductCard({ name, price, thumbnail, id, stock }) {
	const [isHover, setIsHover] = useState(null);
	
	const history = useHistory();
	const dispatch = useDispatch();

	const handleClick = () => {
		history.push(`/product/${id}`);
		dispatch(clearProduct());
		dispatch(clearErrorMsg());
	};

	return (
		<Box
			position='relative'
			onClick={!stock ? null : handleClick}
			onMouseEnter={() => setIsHover(stock)}
			onMouseLeave={() => setIsHover(null)}
			overflow='hidden'
			flexDirection='column'
			width='100%'
			cursor={!stock ? 'default' : 'pointer'}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<Image
				borderRadius='5px'
				width='100%'
				src={thumbnail}
				alt='productImg'
				filter={!stock && true}
			/>
			<Title my='15px'>{name}</Title>
			<Text>USD {price}</Text>
			<AnimatePresence>
				{isHover === stock && !stock && (
					<Box
						position='absolute'
						width='100%'
						height='50px'
						bg='#ffeeeedf'
						alignItems='center'
						justifyContent='center'
						initial={{y: -100}}
						animate={{y: 0}}
						exit={{y: -100}}
					>
						<Title color='#420101cf'>Agotado</Title>
					</Box>
				)}
			</AnimatePresence>
		</Box>
	);
}

export default ProductCard;
