import React from 'react';
import { Box } from '../../components/Box/Box';
import DescriptionSection from '../../components/DescriptionSection/DescriptionSection';
import { Image } from '../../components/Image/Image';
import MainBase from '../../components/MainBase/MainBase';
import { Section } from '../../components/Section/Section';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import contact from '../../services/svg/contact.svg';

function ContactPage() {
	return (
		<MainBase>
			<DescriptionSection>
				<Title>Contact Us</Title>
				<Text my='10px'>We are here to help!</Text>
			</DescriptionSection>
			<Section
				flexDirection={['column', 'column', 'row']}
				py='54px'
				px={['20px', '20px', '145px']}
				alignItems='center'
				justifyContent='center'
			>
				<Image
					width={['70%', '70%', '40%']}
					src={contact}
					alt='about'
					mb='40px'
				/>
				<Box flexDirection='column'>
					<Title mb='20px'>Get In Touch</Title>
					<Text>Whatsapp: +5491128576884</Text>
					<Text>Email: joxpulp@gmail.com</Text>
				</Box>
			</Section>
		</MainBase>
	);
}

export default ContactPage;
