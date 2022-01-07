import React from 'react';
import { Text } from '../../components/Text/Text';
import { Image } from '../../components/Image/Image';
import notfound from '../../services/svg/404.svg';
import { useHistory } from 'react-router-dom';
import { Section } from '../../components/Section/Section';
import { ButtonBase } from '../../components/Button/ButtonBase/ButtonBase';

function NotFoundPage() {
	const history = useHistory();
	return (
		<Section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			flexDirection='column'
			width='100%'
			height='100vh'
			alignItems='center'
			justifyContent='center'
		>
			<Image
				animate={{ y: 20}}
				transition={{ y: { duration: 0.5, yoyo: Infinity } }}
				src={notfound}
				alt='404'
			/>
			<Text mb='20px'>Oops! Seems that this page does not exist</Text>
			<ButtonBase
				bg='black'
				color='white'
				width='125px'
				onClick={() => history.push('/')}
			>
				Back to Shop
			</ButtonBase>
		</Section>
	);
}

export default NotFoundPage;
