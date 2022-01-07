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
	background,
} from 'styled-system';
import { motion } from 'framer-motion';

export const Box = styled(motion.div)`
	${space}
	${color}
	${typography}
	${layout}
	${flexbox}
	${grid}
	${border}
	${position}
	${shadow}
	${background}
	display: ${(props) => (props.display ? props.display : 'flex')};
	cursor: ${(props) => props.cursor};
	backdrop-filter: ${(props) => props.glass && 'blur(10px )'};
	-webkit-backdrop-filter: ${(props) => props.glass && 'blur(10px)'};
`;
