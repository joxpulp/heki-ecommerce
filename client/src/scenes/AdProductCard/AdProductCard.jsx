import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	clearProduct,
	deleteProduct,
} from '../../reducers/products/productsReducer';
import { Box } from '../../components/Box/Box';
import { ButtonBase } from '../../components/Button/ButtonBase/ButtonBase';
import { Image } from '../../components/Image/Image';

function AdProductCard({ thumbnail, id }) {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleEdit = () => {
		history.push(`adminpanel/productedit/${id}`);
		dispatch(clearProduct());
	};

	return (
		<Box
			border='1px solid #e7e7e7'
			borderRadius='5px'
			overflow='hidden'
			flexDirection='column'
			width='100%'
			alignItems='center'
		>
			<Image width='100%' src={thumbnail} alt='productImg' />
			<Box width='100%' alignItems='center' justifyContent='center' my='15px'>
				<ButtonBase width='30%' onClick={handleEdit} mr='10px'>
					Edit
				</ButtonBase>
				<ButtonBase width='30%' onClick={() => dispatch(deleteProduct(id))}>
					Delete
				</ButtonBase>
			</Box>
		</Box>
	);
}

export default AdProductCard;
