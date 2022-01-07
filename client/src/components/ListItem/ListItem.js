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

export const ListItem = styled(motion.li)`
	${space}
	${color}
	${typography}
	${layout}
	${flexbox}
	${grid}
	${border}
	${position}
	${shadow}
	cursor: pointer;
`;
