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

export const Text = styled(motion.p)`
	${space}
	${color}
	${typography}
	${layout}
	${flexbox}
	${grid}
	${border}
	${position}
	${shadow}
	transition: ${(props) => props.transition};
	cursor: ${(props) => props.cursor};
`;
