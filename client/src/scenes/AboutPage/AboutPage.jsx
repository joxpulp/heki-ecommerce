import React from 'react';
import { Section } from '../../components/Section/Section';
import { Title } from '../../components/Title/Title';
import { Text } from '../../components/Text/Text';
import { Image } from '../../components/Image/Image';
import MainBase from '../../components/MainBase/MainBase';
import DescriptionSection from '../../components/DescriptionSection/DescriptionSection';
import about from '../../services/svg/about.svg';

function AboutPage() {
	return (
		<MainBase>
			<DescriptionSection>
				<Title>About Us</Title>
				<Text my='10px'>Wanna know more about us?.. this is the page</Text>
			</DescriptionSection>
			<Section
				flexDirection='column'
				py='54px'
				px={['20px', '20px', '145px']}
				alignItems='center'
			>
				<Image
					width={['50%', '50%', '30%']}
					src={about}
					alt='about'
					mb='40px'
				/>
				<Text fontSize='20px'>
					As a company, our goal is to improve people's lives, to contribute to
					the development of our communities and the preservation of the
					environment. Nowadays, all businesses are generating torrents of data
					every day about their internal and external customers, and with the
					right tools and technologies, Edrans can help you get the most out of
					that information: from insights on consumer behavior, KPIs and
					environment metrics you can get a deeper level of understanding of
					your customers’ sentiment and emotional drivers when engaging with
					your business, and forecasts based on historical data and modelled
					projections. We humanize data by understanding human behavior,
					focusing on the functional and emotional aspects of data to create
					experiences through technology that empower your business and create
					lasting value.
				</Text>
			</Section>
		</MainBase>
	);
}

export default AboutPage;
