import styled from 'styled-components';
import {
	space,
	color,
	typography,
	layout,
	flexbox,
	grid,
	border,
	position,
	shadow,
} from 'styled-system';
import { motion } from 'framer-motion';

export const Title = styled(motion.h1)`
	${space}
	${color}
	${typography}
	${layout}
	${flexbox}
	${grid}
	${border}
	${position}
	${shadow}
	font-family: ${props => props.theme.fonts.chakra};
	transition: ${(props) => props.transition};
	cursor: ${(props) => props.cursor};
`;
