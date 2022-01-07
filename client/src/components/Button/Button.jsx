import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonBase } from './ButtonBase/ButtonBase';
import { ImpulseSpinner } from 'react-spinners-kit';

function Button({children, ...props}) {
	const { loading } = useSelector((state) => state.ui);

	return (
		<ButtonBase
			bg='black'
			color='white'
			type='submit'
			mr='10px'
			disabled={loading}
			{...props}
		>
			{loading ? (
				<ImpulseSpinner frontColor='#ffff' backColor='#666666' />
			) : (
				children
			)}
		</ButtonBase>
	);
}

export default Button;
